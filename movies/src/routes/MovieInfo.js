import axios from 'axios';
import { useEffect, useState } from 'react';

export default function MovieInfo({link}){
    const [movieInfo, setMovieInfo] = useState([]);
    
    useEffect (()=>{
        const fetchMovieInfo = async () => {
            try{
                const res = axios.get(link);
                const data = (await res).data;
                setMovieInfo(data);
            }catch(error){
                console.log(error);
            }
        }
        fetchMovieInfo();
    },[link]);

    return(
        <div>
            <table>
                <tbody>
                    {movieInfo.map((data)=>(<tr key={data[0]}>{data.map((i)=>(<th key={i}>{i}</th>))}</tr>))}
                </tbody>
            </table>
        </div>
    );
}