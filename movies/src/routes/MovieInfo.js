import axios from 'axios';
import { useEffect, useState } from 'react';

export default function MovieInfo({link, children}){
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
        <>
        {movieInfo.length === 0 ? <></> :
        <>
            <div className="description">
                <h2>{movieInfo[0][3]}</h2>
            </div>
            <div className="labels">
                <div className="label">
                    <p>Genre: <span>{movieInfo[0][1]}</span></p>
                </div>
                <div className="label">
                    <p>Rating: <span>{movieInfo[0][2]}</span></p>
                </div>
                <div className="label">
                    <p>Release Year: <span>{movieInfo[0][5]}</span></p>
                </div>
                <div className="label">
                    <p>Special Feature: <span>{movieInfo[0][6]}</span></p>
                </div>
                <div className="label">
                    <p>Number of Times Rented: <span>{movieInfo[0][7]}</span></p>
                </div>
            </div>
            <div className="description">
                <p>{movieInfo[0][4]}</p>
            </div>
            {children}
        </>}
        </> 
    );
}