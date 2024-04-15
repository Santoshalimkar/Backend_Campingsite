const morgan = require("morgan");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const admin = require("firebase-admin");
const fs = require("fs");

const schedule = require("node-schedule");
const winston = require("./Winston/config");

const dbconnect = require("./Config/DBconnect.js");
const {Ownerroutes} =require('./Routes/Propertyowner/propertyowner.js')

const app = express();

// app.use(morgan("combined", { stream: winston.stream }));

// cookie parser middleware
app.use(cookieParser());

// pass json data
app.use(express.json());
// pass form data
app.use(express.urlencoded({ extended: true }));

// Cors middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      // TODO: Re-enable CORS during production (security)
      // if (allowedOrigins.indexOf(origin) === -1) {
      // 	let msg =
      // 		"The CORS policy for this site does not " +
      // 		"allow access from the specified Origin.";
      // 	return callback(new AppErr(msg, 500), false);
      // }
      return callback(null, true);
    },
    credentials: true,
  })
);


const PORT = process.env.PORT || 8000;



app.use("/api/v1/owner", Ownerroutes );



const start = async () => {
  winston.info("You have successfully started working with winston and morgan");
  try {
    await dbconnect();
    winston.info("Database connected successfully");
    app.listen(PORT, () => {
      winston.info(`Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    await winston.error(`Server Error ${error.message}`);
    // process.exit(1);
  }
};

start();

// Shutdown any scheduled job if system interrupt occurs
// process.on("SIGINT", function () {
// 	schedule.gracefulShutdown().then(() => process.exit(0));
// });
