import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Builder from "./pages/Builder";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PortfolioView from "./pages/PortfolioView";
import Navbar from "./component/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/builder" element={<Builder/>}/>    
        <Route path="/builder/:id" element={<Builder/>}/> 
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/portfolio/:username/:id" element={<PortfolioView/>}/>
        <Route path="/portfolio/:username" element={<PortfolioView/>}/>
      </Routes>
    </Router>
  )
}
export default App;