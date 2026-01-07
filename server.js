
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDB connected"))
  .catch(err=>console.log(err));

const quizSchema = new mongoose.Schema({
  name: String,
  subject: String,
  score: Number,
});

const Quiz = mongoose.model("Quiz", quizSchema);

app.post("/api/quiz", async (req,res)=>{
  const q = await Quiz.create(req.body);
  res.json(q);
});

app.get("/api/leaderboard", async (req,res)=>{
  const top = await Quiz.find().sort({score:-1}).limit(10);
  res.json(top);
});

app.listen(5000, ()=>console.log("Server running on http://localhost:5000"));
