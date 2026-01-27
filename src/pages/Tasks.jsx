import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "../api/axios";

function Tasks() {
  const {skillId} = useParams();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = async (currentPage = 1) => {
    try {
      const {data} = await axios.get(
        `/tasks/getTask/${skillId}?page=${currentPage}&limit=5`,
      );

      setTasks(data.tasks);
      setTotalPages(data.totalPages);
      // setPage(data.page);
    } catch {
      alert("Failed to fetch tasks");
    }
  };
  useEffect(() => {
    const load = async () => {
      try {
        const {data} = await axios.get(
          `/tasks/getTask/${skillId}?page=${page}&limit=5`,
        );

        setTasks(data.tasks);
        setTotalPages(data.totalPages);
      } catch {
        alert("Failed to fetch tasks");
      }
    };

    load();
  }, [page, skillId]);

  // Add task
  const addTask = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/tasks/addTask/${skillId}`, {title});
      setTitle("");
      fetchTasks(page);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  // Mark complete
  const markComplete = async (taskId, completed) => {
    try {
      await axios.put(`/tasks/toggle/${taskId}`, {completed: !completed});
      fetchTasks(page);
    } catch {
      alert("failed to update task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8">Tasks</h2>

        {/* Add Task Card */}
        <div className="bg-white p-6 rounded-2xl shadow mb-8">
          <form onSubmit={addTask} className="flex gap-4">
            <input
              type="text"
              placeholder="New task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 rounded-lg hover:bg-gray-800 transition"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-5 rounded-2xl shadow flex justify-between items-center"
            >
              <span
                className={`text-lg ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </span>

              <button
                onClick={() => markComplete(task._id, task.completed)}
                className={`px-4 py-2 rounded-lg text-white transition ${
                  task.completed
                    ? "bg-black hover:bg-gray-800"
                    : "bg-gray-600 hover:bg-gray-700"
                }`}
              >
                {task.completed ? "Completed" : "Mark Complete"}
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-5 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-5 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default Tasks;
