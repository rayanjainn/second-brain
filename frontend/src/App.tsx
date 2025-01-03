import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import DashBoard from "./pages/Dashboard";
import { SharedBrain } from "./pages/SharedBrain";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/share/:shareId" element={<SharedBrain />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
