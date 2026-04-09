import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handlelogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    return (
    <div className="w-full bg-black/40 backdrop-blur-md border-b border-gray-800 px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white cursor-pointer" 
            onClick={() => navigate("/dashboard")}>DevFolio</h1>
            <div className="flex items-center gap-6">
        <button className="text-gray-300 hover:text-blue-400 transition"
        onClick={()=>navigate("/builder")}>Create</button>
        <button className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg 
          hover:bg-red-500/20 transition"
          onClick={handlelogout}>Logout</button>
    </div>
    </div>
);
}
export default Navbar;