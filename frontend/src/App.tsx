import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Landing from "./pages/Landing";

import Signup from "./pages/Signup";

import Login from "./pages/Login";

import Home from "./pages/Home";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />

        <Route path="/home" element={<ProtectedRoute><Home/> </ProtectedRoute>} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
