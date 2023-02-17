import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Signup from "./pages/Signup";
import AddTruck from "./pages/AddTruck";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add_truck" element={<AddTruck />} />
        <Route element={<ProtectedRoutes />}></Route>

        <Route path="*" element={<p>Error page</p>} />
      </Routes>
    </div>
  );
}

export default App;
