import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import API from "../services/api";
import Navbar from "../component/Navbar";

function Dashboard() {
   const [portfolios, setPortfolios] = useState([]);
   const navigate = useNavigate();
   const fetchportfolios = async () => {
         const res = await API.get("/portfolio/my-portfolio");
         setPortfolios(res.data);
      };
   useEffect(()=>{
      fetchportfolios();
   },[]);

   const handleDelete = async (id) => {
      await API.delete(`/portfolio/delete/${id}`);
      alert("Portfolio deleted successfully");
      fetchportfolios();
   }
   console.log("all portfolios:", portfolios);
   
   return(
      <div  className="min-h-screen bg-black flex flex-col items-center px-6 py-1">
         <Navbar/>
         <div className="w-full max-w-6xl flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-white px-5 py-5">Dashboard</h1>
         
      </div>
       <div className="w-full max-w-6xl bg-gradient-to-br from-gray-900 to-gray-800 
        rounded-2xl p-8 shadow-2xl border border-gray-700 backdrop-blur-lg">

        <h2 className="text-2xl font-semibold text-white mb-6">
          My Portfolios
        </h2>
         {portfolios.length === 0 ? (
        <p className="text-gray-400">No portfolios yet</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {portfolios.map((p) => (
           
            <div
              key={p._id}
              className="bg-black/40 backdrop-blur-md 
                border border-gray-700 rounded-xl p-5 
                hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 
                transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-white mb-2">
                {p.title}
              </h2>

              <p className="text-gray-400 text-sm mb-4">
                {p.description}
              </p>

              <div className="flex justify-between items-center mt-4">

               <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                  {p.template}
                </span>
                <div className="flex justify-between mt-5">

                
                  <button
                    onClick={() => navigate(`/portfolio/${p.user.username}/${p._id}`)}
                    className="text-blue-400 hover:underline"
                  >
                    view
                  </button>
                  <button
                    onClick={() => navigate(`/builder/${p._id}`)}
                    className="text-blue-400 hover:underline"
                  >
                    Edit
                  </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
                

              </div>
            </div>
          </div>
          
          ))}

        </div>
      )}
       </div>
    </div>
  );
}

export default Dashboard;