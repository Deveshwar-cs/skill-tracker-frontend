import {useEffect, useState} from "react";
import axios from "../api/axios";
import {useNavigate} from "react-router-dom";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchSkills = async () => {
    try {
      const {data} = await axios.get("/skills");
      setSkills(data);
    } catch {
      alert("failed to fetch skills");
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const {data} = await axios.get("/skills");
        setSkills(data);
      } catch {
        alert("failed to fetch skills");
      }
    };
    fetchSkills();
  }, []);

  const addSkill = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/skills/addSkill", {name});
      setName("");
      fetchSkills();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Your Skills</h2>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>

        {/* Add Skill Card */}
        <div className="bg-white p-6 rounded-2xl shadow mb-8">
          <form onSubmit={addSkill} className="flex gap-4">
            <input
              type="text"
              placeholder="Enter skill name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 rounded-lg hover:bg-gray-800 transition"
            >
              Add Skill
            </button>
          </form>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill._id}
              onClick={() => navigate(`/tasks/${skill._id}`)}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold">{skill.name}</h3>
              <p className="text-sm text-gray-600 mt-2">
                {skill.completedTasks} / {skill.totalTasks} tasks completed
              </p>
              <div className="w-full bg-gray-200 h-3 rounded mt-2">
                <div
                  className="bg-green-500 h-3 rounded"
                  style={{
                    width: `${
                      skill.totalTasks
                        ? (skill.completedTasks / skill.totalTasks) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;
