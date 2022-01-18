import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Wallet from "./components/Wallet";
import Admin from "./components/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Wallet />} />
      <Route path="register" exact element={<Signup />} />
      <Route path="login" exact element={<Login />} />
      <Route path="admin" exact element={<Admin />} />
      <Route path="/user/:id" exact element={<Wallet />} />
    </Routes>
  );
}

export default App;
