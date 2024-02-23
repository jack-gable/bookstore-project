import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// middleware for parsing body
app.use(express.json());

// middleware for handling CORS policy
// option 1: allow all origins with default of cors(*)
app.use(cors());
// option 2: allow custom origins
// app.use(
// 	cors({
// 		origin: "http://localhost:3000",
// 		methods: ["GET", "PUT", "POST", "DELETE"],
// 		allowedHeaders: ["Content-type"],
// 	})
// );

app.get("/", (req, res) => {
	console.log(req);
	return res.status(234).send("Welcome to MERN tutorial");
});

app.use("/books", booksRoute);

mongoose
	.connect(mongoDBURL)
	.then(() => {
		console.log("app connected to database");
		app.listen(PORT, () => {
			console.log(`App is listening on port: ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
