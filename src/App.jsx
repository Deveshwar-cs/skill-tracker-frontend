import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Skills from "./pages/Skills";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/skills"
          element={
            <ProtectedRoute>
              <Skills />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/:skillId"
          element={
            <ProtectedRoute>
              <Tasks />{" "}
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
