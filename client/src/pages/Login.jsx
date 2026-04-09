import {useState} from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

function Login() {

    // const [email, setEmail] = useState(" ");
    const [username, setUsername] = useState(" ");
    const [password, setPassword] = useState(" ");

    const navigate = useNavigate();

    const handleLogin = async () => {
      try{
        const res = await API.post("/auth/login",{
            username,
            password
        });
        localStorage.setItem("token", res.data.token);
        alert("Login successful");
        navigate("/dashboard");
      } catch(error){
        alert("Login failed");
        console.log(error);
      }
    };
  return (
    <div className=" bg-black border border-gray-700 w-full p-3 mb-6 rounded text-white 
                           flex h-screen justify-center items-center ">
      <div className="bg-gradient-to-br from-black via-gray-800 to-black-900 p-10 rounded-xl shadow-lg w-96">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>

      <input 
      className=" bg-black border border-gray-700 w-full p-3 mb-6 rounded text-white 
                          hover:shadow-[0_0_10px_#CE93D8] 
                          focus:shadow-[0_0_15px_#3b82f6] 
                          focus:ring-2 focus:ring-white-500 
                          transition-all duration-300 ease-in-out"
      placeholder="Username"
      onChange={(e)=>setUsername(e.target.value)} />

      <input  className="  bg-black border border-gray-700 w-full p-3 mb-6 rounded text-white 
                          hover:shadow-[0_0_10px_#CE93D8] 
                          focus:shadow-[0_0_15px_#3b82f6] 
                          focus:ring-2 focus:ring-white-500 
                          transition-all duration-300 ease-in-out" 
      
      type="password"
      placeholder="Password"
      onChange={(e)=>setPassword(e.target.value)} />
      
      <button  
      className=" bg-gradient-to-br from-blue-900 w-full p-3 mb-6 rounded bg-gray text-white" 
      onClick={handleLogin}>
        Login
      </button>
<div className="text-center mt-6">
      <p className="text-gray-400 text-sm text-center mt-4">
        Dont have an account ?</p>
      <Link 
      className="inline-block bg-gray-70 px-4 py-2 rounded text-blue-400 hover:bg-gray-600"
      to="/register">Register</Link>
    </div>
    </div>
    </div>
  );
}
export default Login;