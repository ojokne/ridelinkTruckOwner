import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Signup from "./pages/Signup";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import AddTruck from "./components/AddTruck";
import Trucks from "./components/Trucks";

function App() {
  return (
    <div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<ProtectedRoutes />}></Route>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="trucks" element={<Trucks />} />
          <Route path="add_truck" element={<AddTruck />} />
        </Route>
        <Route path="*" element={<p>Error page</p>} />
      </Routes>
    </div>
  );
}

export default App;
