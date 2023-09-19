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
router.post("/saveuser", async (req, res) => {
  try {
    const { name, phone, pincode } = req.body
    const email = req.body.email.toLowerCase()

    const newUser = new catalogSchema({
      name,
      phone,
      email,
      pincode
    })
    await newUser.save()
    res.status(201).json({ status: true, msg: "Saved Successfully" })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error })
  }
})

module.exports = router