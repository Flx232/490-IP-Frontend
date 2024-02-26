import axios from 'axios';
import { useEffect, useState } from 'react';
const backendURL = `http://localhost:8000`;

export default function CustomerInfo({custId}){
    const [rentalInfo, setRentalInfo] = useState([]);
    
    useEffect (()=>{
        const fetchMovieInfo = async () => {
            try{
                const res2 = axios.get(`${backendURL}/rental/${custId}`);
                const data2 = (await res2).data;
                setRentalInfo(data2);
            }catch(error){
                console.log(error);
            }
        }
        fetchMovieInfo();
    },[custId]);

    return(
        <>
        {rentalInfo.length === 0 ? <></> :
            <>
                Total Number of Rentals: {rentalInfo[0][0]}
                <span> | </span>
                Number of Movies that have been returned: {rentalInfo[0][0] - rentalInfo[0][1]}
                <br></br><br></br>
                Number of movies rented out: {rentalInfo[0][1]}
            </>
        }
        </>
    );
}