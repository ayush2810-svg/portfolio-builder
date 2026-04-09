import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
export default function Register() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
      try {
        const res = await API.post("auth/register", {
          name,
          username,
          email,
          password,
          confirmPassword,
        });
        // localStorage.setItem("token", res.data.token);
        alert(res.data.message || "Registration successful");
        navigate("/login");
      } catch (error) {
        alert(err.response?.data?.message || "Registration failed");
        console.log(err.response?.data);
      }
    };
  return (
    <div className="bg-black border border-gray-700 w-full p-3 mb-6 rounded text-white 
                          hover:shadow-[0_0_10px_#CE93D8] 
                          focus:shadow-[0_0_15px_#3b82f6] 
                          focus:ring-2 focus:ring-white-500 
                          transition-all duration-300 ease-in-out flex h-screen justify-center items-center">
      <div className="bg-gradient-to-br from-black via-gray-800 to-black-900 p-10 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Register
        </h1>
        <input
        className="bg-black border border-gray-700 w-full p-3 mb-6 rounded text-white 
                          hover:shadow-[0_0_10px_#CE93D8] 
                          focus:shadow-[0_0_15px_#3b82f6] 
                          focus:ring-2 focus:ring-white-500 
                          transition-all duration-300 ease-in-out"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)} />

        <input
          className="bg-black border border-gray-700 w-full p-3 mb-6 rounded text-white 
                          hover:shadow-[0_0_10px_#CE93D8] 
                          focus:shadow-[0_0_15px_#3b82f6] 
                          focus:ring-2 focus:ring-white-500 
                          transition-all duration-300 ease-in-out"
          placeholder="UserName"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="bg-black border border-gray-700 w-full p-3 mb-6 rounded text-white 
                          hover:shadow-[0_0_10px_#CE93D8] 
                          focus:shadow-[0_0_15px_#3b82f6] 
                          focus:ring-2 focus:ring-white-500 
                          transition-all duration-300 ease-in-out"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="bg-black border border-gray-700 w-full p-3 mb-6 rounded text-white 
                          hover:shadow-[0_0_10px_#CE93D8] 
                          focus:shadow-[0_0_15px_#3b82f6] 
                          focus:ring-2 focus:ring-white-500 
                          transition-all duration-300 ease-in-out"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="Confirm password"
          className="bg-black border border-gray-700 w-full p-3 mb-6 rounded text-white 
                          hover:shadow-[0_0_10px_#CE93D8] 
                          focus:shadow-[0_0_15px_#3b82f6] 
                          focus:ring-2 focus:ring-white-500 
                          transition-all duration-300 ease-in-out"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button  className="bg-gradient-to-br from-blue-900 w-full p-3 mb-6 rounded bg-gray text-white"
         onClick={handleRegister}>
            Register
        </button>
      </div>
    </div>
  )
}
