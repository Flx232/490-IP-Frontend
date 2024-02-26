import { useLocation, useNavigate } from "react-router-dom";
import Paging from './Paging';
import { useState, useEffect } from 'react';
import axios from 'axios';
const backendURL = `http://localhost:8000`;

export default function Return(){
    const location = useLocation();
    const nav = useNavigate();
    const [step, setStep] = useState(0);
    const [rentals, setRentals] = useState([]);
    const movie = location.state;
    const numRows = 2;
    const maxStep = Math.round(rentals.length/numRows);

    useEffect(()=>{
        const fetchMovies = async() =>{
            try{
                const res = await axios.get(`${backendURL}/rentals/movie/${movie}`)
                const data = (await res).data;
                setRentals(data);
            }catch(error){
                console.log(error);
            }
        };
        fetchMovies();
    }, [movie]);

    function handleReturn(id){
        const return_movie = {
            customer_id:id,
            film_id:movie
        }
        const returnMovie = async(return_movie) =>{
            try{
                await axios.patch(`${backendURL}/return/movie`, return_movie);
                window.location.reload();
            }catch(error){
                console.log(error);
            }
        };
        returnMovie(return_movie);
    }

    return(
        <>
            <div className="head">
                <button className="back" onClick={()=>(nav('/movies'))}>←</button>
                <h1>List of Customers who rented</h1>
            </div>
            <div className="row">
                <table>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    {rentals.map((row, index)=>index>=step*numRows && index < ((step+1)*numRows > rentals.length-1 ? rentals.length : (step+1)*numRows)? (<tr>
                        {row.map((data, index)=>(
                            index !== 0 && index <=3 ? 
                            <>
                                <td><div>{data}</div></td>
                            </> : <></>))}
                        <td><button className="delete" onClick={()=>handleReturn(rentals[index][0])}>Return</button></td>
                    </tr>): <></>)}
                </table>
            </div>
            <div className="footer">
            {rentals.length / numRows <= 1 ? <></> :
            <Paging maxStep={maxStep} setStep={setStep} step={step}/>
            }
            </div>
        </>
    );
};