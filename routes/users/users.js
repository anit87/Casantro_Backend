const express = require("express")
const axios = require("axios")
const mongoose = require("mongoose")
const router = express.Router()

const cookieParser = require('cookie-parser');
router.use(cookieParser());
require("dotenv").config()
const catalogSchema = require("../../models/forms/catalog")
const {generateOTP} = require("../../utils/functions")


const url = process.env.Kaleyra_URL
const headers = {
  'api-key': process.env.Kaleyra_API_KEY,
  'Content-Type': "application/json",
};

router.post("/sendotp", async (req, res) => {
  try {
    const otp =await generateOTP()
    const data = {
      to: `+91${req.body.phone}`,
      sender: "LIVSPC",
      type: 'OTP',
      body: `Hello there, ${otp} is your Casantro account verification code. Use this to complete the sign up -Livspace`,
      source: "API",
      template_id: "1107169525553414311"
    };
    const resp = await axios.post(`${url}/messages`, data, { headers });
    res.cookie('otp', otp, { maxAge: 900000 });
    res.json(resp.data)
  }
  catch (error) {
    console.log(error.message);
    res.status(500).json({ error })
  }
})

router.get('/users', async (req, res) => {
  try {
    const users = await catalogSchema.find({});
    res.json({ status: true, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post("/saveuser", async (req, res) => {
  try {
    const email = req.body.email.toLowerCase()
    const newUser = new catalogSchema({ ...req.body, email })
    await newUser.save()
    res.status(201).json({ status: true, msg: "Saved Successfully" })
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = [];
      for (const field in error.errors) {
        validationErrors.push(error.errors[field].message);
      }
      res.json({ status: false, error: validationErrors });
    } else {
      console.error("Error: ", error);
      res.status(500).json({ status: false, error: "Internal Server Error" });
    }
  }
})

module.exports = router