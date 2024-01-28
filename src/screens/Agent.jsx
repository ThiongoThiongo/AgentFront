import Dashboard from "../components/Dashboard"
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const Agent = () => {

  const [instacartAcounts, setInstacartAccounts] = useState([])
   const navigate = useNavigate()

const calledChecked = (id, state) => {
  var instas = [...instacartAcounts];
if(instas.length)
{
  instas.map((insta)=> {
    if(insta._id === id){
      return insta.checked = state
    }
  })
}

  setInstacartAccounts(instas)
}
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://instacartbackend.onrender.com/api/instacart/');
          var fetchedData = await response.json();
           setInstacartAccounts(fetchedData);
      
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []); 
  return (
    <div className="center">
     <Dashboard instacart = {instacartAcounts} called = {calledChecked}/>
    </div>
  )
}

export default Agent
