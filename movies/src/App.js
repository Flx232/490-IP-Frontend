import {useState, useEffect} from 'react'
import axios from 'axios';
const backendURL = `http://localhost:8000`;

function App() {
  const [top5, setTop5] = useState({});
  const fetchTop5 = async () => {
    try{
      const res = await axios.get(`${backendURL}`);
      const data = (await res).data;
      setTop5(data);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchTop5();
  }, []);

  return (
    <div>
      Help
      <table>
          <tr>
            {top5.columns.map((colName)=>(<th>{colName}</th>))}
          </tr>
          {top5.data.map((data)=>(<tr>{data.map((i)=>(<th>{i}</th>))}</tr>))}
      </table>
    </div>
  );
}

export default App;
