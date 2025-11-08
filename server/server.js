import express, { request } from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";

connectDB()

const app = express()
app.use(cors()) // Enable Cross-Origin Resource Sharing (Allow Front-end connect to Back-end)


// Middleware
app.use(express.json())
app.use(clerkMiddleware())

// API to listen Clerk Webhooks
app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res)=> res.send("API is working"))

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));