
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./index.css";

export default function App() {
  const [data,setData] = useState([]);
  const [dark,setDark] = useState(true);
  const [name,setName] = useState("");
  const [subject,setSubject] = useState("Science");
  const [score,setScore] = useState("");

  useEffect(()=>{
    axios.get("http://localhost:5000/api/leaderboard")
      .then(res=>setData(res.data));
  },[]);

  const submitResult = async () => {
    await axios.post("http://localhost:5000/api/quiz", { name, subject, score:Number(score) });
    window.location.reload();
  }

  return (
    <div className={dark?"bg-black text-white min-h-screen":"bg-pink-100 text-black min-h-screen"}>
      <div className="p-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold">🏆 Quiz Result Tracker</h1>
        <button onClick={()=>setDark(!dark)} className="px-3 py-1 rounded bg-gradient-to-r from-pink-500 to-yellow-500">
          {dark?"🌞 Light":"🌙 Dark"}
        </button>
      </div>

      <div className="max-w-md mx-auto p-5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 shadow-xl mb-6">
        <h2 className="text-2xl font-bold mb-3">📝 Submit Quiz</h2>
        <input className="w-full p-2 rounded mb-2 text-black" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
        <select className="w-full p-2 rounded mb-2 text-black" value={subject} onChange={e=>setSubject(e.target.value)}>
          <option>Science</option><option>Math</option><option>Computer</option><option>English</option><option>History</option><option>Aptitude</option>
        </select>
        <input type="number" className="w-full p-2 rounded mb-3 text-black" placeholder="Score (0-10)" value={score} onChange={e=>setScore(e.target.value)} />
        <button onClick={submitResult} className="w-full py-2 rounded-xl bg-black text-white font-bold hover:scale-105 transition">
          🚀 Submit
        </button>
      </div>

      <div className="grid gap-4 p-5 max-w-xl mx-auto">
        {data.map((u,i)=> (
          <motion.div key={i} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
            className="p-4 rounded-2xl shadow-xl bg-gradient-to-r from-purple-500 to-pink-500">
            <h2 className="text-xl">#{i+1} {u.name}</h2>
            <p>📘 {u.subject}</p>
            <p className="text-2xl">Score: {u.score} {u.score>5?"✅🔥":"❌😢"}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
