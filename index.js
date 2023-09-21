const express = require('express')
const cors = require('cors')
const app = express()
const connectDb = require("./utils/db")
const usersRouter = require("./routes/users/users")

const port = 4000
connectDb()
// app.use(cors())

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json())
app.use("/", usersRouter)

app.get('/', (req, res) => {
  res.json({ message: 'Server is Running' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})