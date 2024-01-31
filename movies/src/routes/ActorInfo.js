import axios from 'axios';
import { useEffect, useState } from 'react';
const backendURL = `http://localhost:8000`;

export default function ActorInfo({actor, select}){
    const [topRented, setTopRented] = useState({});
    const [actorLoading, setActorLoading] = useState(true);

    const fetchActorInfo = async () => {
        setActorLoading(true);
        try{
            const res = axios.get(`${backendURL}/actor/${actor.actorId}`);
            const data = (await res).data;
            setTopRented(data);
        }catch(error){
            console.log(error);
        }
        setActorLoading(false);
    }
    
    useEffect (()=>{
        fetchActorInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <div>
            {select && !actorLoading ?
            <>
            <strong>{actor.actorName}'s top 5 most rented movies</strong>
            <table>
                <tbody>
                    {topRented.data.map((data)=>(<tr key={data[0]}>{data.map((i)=>(<th key={i}>{i}</th>))}</tr>))}
                </tbody>
            </table> 
            </>: <></>
            }
        </div>
    );
}