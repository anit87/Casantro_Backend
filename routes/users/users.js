const express = require("express")
const axios = require("axios")
const mongoose = require("mongoose")
const router = express.Router()
require("dotenv").config()
const catalogSchema = require("../../models/forms/catalog")

const url = process.env.Kaleyra_URL
const headers = {
  'api-key': process.env.Kaleyra_API_KEY,
  'Content-Type': "application/json",
};

router.post("/sendotp", async (req, res) => {
  try {
    const data = {
      to: req.body.phone,
      sender: "LIVSPC",
      type: 'OTP',
      body: "Dear Customer, your OTP (One Time Password) for the Verification from Kaleyra",
      source: "API"
    };
    const resp = await axios.post(`${url}/messages`, data, { headers });
    res.json(resp.data)
  }
  catch (error) {
    console.log(error.message);
    res.status(500).json({ error })
  }
})

// router.post("/saveuser", async (req, res) => {
//   try {
//     const email = req.body.email.toLowerCase()
//     const newUser = new catalogSchema({ ...req.body, email })
//     await newUser.save()
//     res.status(201).json({ status: true, msg: "Saved Successfully" })
//   } catch (error) {
//     console.log("qqqqqqq ", error);
//     res.status(500).json({ error })
//   }
// })
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
      res.json({ status: false, error:validationErrors });
    } else {
      console.error("Error: ", error);
      res.status(500).json({ status: false, error: "Internal Server Error" });
    }
  }
})

module.exports = router