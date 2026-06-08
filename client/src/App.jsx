import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Builder from "./pages/Builder";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PortfolioView from "./pages/PortfolioView";
import Navbar from "./component/Navbar";
import MyPortfolios from "./pages/Myportfolios";
import MainLayout from "./pages/MainLayout";
import Modern from "./pages/Modern";
import Professional from "./pages/Professional";
import Actions from "./pages/Actions";
import Profile from "./pages/Profile";
import AccountSet from "./pages/Accountset";
import Subscription from "./pages/Subscription";
import TemplateSelector from "./pages/TemplateSelector";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/builder" element={<Builder/>}/>    
        <Route path="/builder/:id" element={<Builder/>}/> 
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={
          <MainLayout>
            <Dashboard/>
          </MainLayout>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/portfolio/:username/:id" element={<PortfolioView/>}/>
        <Route path="/portfolio/:username" element={<PortfolioView/>}/>
        <Route path="/my-portfolios" element={
          <MainLayout>
            <MyPortfolios/>
          </MainLayout>}/>
        <Route path="/mainlayout" element={<MainLayout/>}/>
        <Route path="/modern" element={
          <MainLayout>
            <Modern/>
          </MainLayout>}/>
        <Route path="/professional" element={
          <MainLayout>
            <Professional/>
          </MainLayout>}/>
        <Route path="/settings" element={
          <MainLayout>
            <Actions/>
          </MainLayout>}/>
        <Route path="/profile" element={
          <MainLayout>
            <Profile/>
          </MainLayout>}/>
        <Route path="/subscription" element={
          <MainLayout>
            <Subscription/>
          </MainLayout>}/>
        <Route path="/select-template" element={
          <MainLayout>
            <TemplateSelector/>
          </MainLayout>}/>
      </Routes>
    </Router>
  )
}
export default App;