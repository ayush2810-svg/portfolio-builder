import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import neo from "../template/modern/Neo";

function PortfolioView() {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const res = await API.get(`/portfolio/${id}`);
        let data=res.data;
        if(typeof data.skills === "string"){
          data.skills = JSON.parse(data.skills);
        }
        if(typeof data.projects === "string"){
          data.projects = JSON.parse(data.projects);
        }
        if(typeof data.contact === "string"){
          data.contact = JSON.parse(data.contact);
        }
        setPortfolio(data);
      } catch (err) {
        console.log(err);
      }
    };
    loadPortfolio();
  }, [id]); 

  if (!portfolio) return <h1>Loading...</h1>;

  const safedata = {
    ...portfolio,
    skills:portfolio.skills ||{
      technical:[],
      nonTechnical: [],
      tools:[]
    },
    projects:portfolio.projects || [],
    contact:portfolio.contact || {}
  };
  switch (portfolio.template) { 
    case "neo":
      return <Neo {...safedata} />;
      default:
        return <div>Unknown template</div>;
  }
}

export default PortfolioView;