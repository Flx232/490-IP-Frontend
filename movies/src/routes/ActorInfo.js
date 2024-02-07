import axios from 'axios';
import { useEffect, useState } from 'react';
const backendURL = `http://localhost:8000`;

export default function ActorInfo({actor}){
    const [topRented, setTopRented] = useState([]);

    
    useEffect(()=>{
        const fetchActorInfo = async () => {
            try{
                const res = axios.get(`${backendURL}/actor/${actor.actorId}`);
                const data = (await res).data;
                setTopRented(data);
            }catch(error){
                console.log(error);
            }
        }
        fetchActorInfo();
    },[actor.actorId])

    return(
        <div className="card">
            <div className="description">
                <h2>{actor.actorName}'s top 5 most rented movies</h2>
            </div>
            <table>
                <tbody>
                    {topRented.map((data)=>(<tr key={data[0]}>{data.map((i)=>(<td key={i}>{i}</td>))}</tr>))}
                </tbody>
            </table> 
        </div>
    );
}