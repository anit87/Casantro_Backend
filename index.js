const express = require('express')
const cors = require('cors')
const app = express()
const connectDb = require("./utils/db")
const usersRouter = require("./routes/users/users")

const port = 4004
connectDb()

// app.use(cors())
// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true,
// };
// app.use(cors(corsOptions));


const dynamicCorsOptions = (origin, callback) => {
  const allowedOrigins = ['http://localhost:5173','http://74.208.229.140:4005','http://events.casantro.com'];

  if (allowedOrigins.includes(origin) || !origin) {
    callback(null, { origin: true, credentials: true });
  } else {
    callback(new Error('Not allowed by CORS'));
  }
};

// Configure CORS with the dynamic options function
app.use((req, res, next) => {
  const requestOrigin = req.get('origin');
  dynamicCorsOptions(requestOrigin, (err, options) => {
    if (err) {
      return res.status(403).send(err.message);
    }
    cors(options)(req, res, next);
  });
});

app.use(express.json())
app.use("/", usersRouter)

app.get('/', (req, res) => {
  res.json({ message: 'Server is Running' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})