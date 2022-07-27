const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasks.js");
const connectDB = require("./db/connect.js");
require("dotenv").config();
const notFound = require("./middleware/notFound.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");

//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasksRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = 3500;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`server is listening on port ${port}`));
	} catch (error) {
		console.log(error);
	}
};

start();
