import axios from 'axios';
import { useEffect, useState } from 'react';
const backendURL = `http://localhost:8000`;

export default function MovieInfo({movieId, select}){
    const [movieInfo, setMovieInfo] = useState({});
    const [movieLoading, setMovieLoading] = useState(true);

    const fetchMovieInfo = async () => {
        setMovieLoading(true);
        try{
            const res = axios.get(`${backendURL}/movie/${movieId}`);
            const data = (await res).data;
            setMovieInfo(data);
        }catch(error){
            console.log(error);
        }
        setMovieLoading(false);
    }
    
    useEffect (()=>{
        fetchMovieInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <div>
            {console.log(movieInfo)}
            {select && !movieLoading ?
            <table>
                <thead>
                    <tr key="Column Names">
                        {movieInfo.columns.map((colName)=>(<th key={colName}>{colName}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {movieInfo.data.map((data)=>(<tr key={data[0]}>{data.map((i)=>(<th key={i}>{i}</th>))}</tr>))}
                </tbody>
            </table> : <></>
            }
        </div>
    );
}