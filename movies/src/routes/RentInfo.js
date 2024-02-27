import { useLocation, useNavigate } from "react-router-dom";
import Paging from './Paging';
import { useState, useEffect } from 'react';
import axios from 'axios';
const backendURL = `http://localhost:8000`;

export default function RentInfo(){
    const location = useLocation();
    const nav = useNavigate();
    const [step1, setStep1] = useState(0);
    const [step2, setStep2] = useState(0);
    const [history, setHistory] = useState([]);
    const [rentOut, setRentOut] = useState([]);
    const [loading, setLoading] = useState(true);
    const customer = location.state;
    const numRows = 2;

    useEffect(()=>{
        const fetchMovies = async() =>{
            try{
                setLoading(true);
                const res = await axios.get(`${backendURL}/customer/rent_hist/${customer[0]}`)
                const data = (await res).data;
                setHistory(data[0]);
                setRentOut(data[1]);
                setLoading(false);
            }catch(error){
                console.log(error);
            }
        };
        fetchMovies();
    }, [customer]);

    function onClickReturn(id){
        const return_movie = {
            customer_id: customer[0],
            film_id: id
        };
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
                <button className="back" onClick={()=>(nav('/customers'))}>←</button>
                <h1>{customer[1]} {customer[2]}'s Rental History</h1>
            </div>
            {!loading ? history.length > 0 ? 
            <>
                <div className="row">
                    <h2>Past Rentals</h2>
                    <table>
                        <tr><th>Title</th><th>Rating</th><th>Description</th><th>Rental Date</th><th>Return Date</th></tr>
                        {history.map((row, index)=>(index>=step1*numRows && index < ((step1+1)*numRows > history.length-1 ? history.length : (step1+1)*numRows)? (<tr>
                        {row.map((data, index)=>(index === 0 ? 
                            undefined : <td>{data}</td>
                        ))}
                        </tr>): <></>))}
                    </table>
                </div>
                <div>
                    {history.length / numRows <= 1 ? <></> :
                        <Paging maxStep={Math.round(history.length/numRows)} setStep={setStep1} step={step1} />}
                </div>
            </>
            : 
            <div className="row">
                <h2>{rentOut.length > 0 ? "It seems they didn't return anything yet" : "It seems they didn't rent out anything"}</h2>
            </div>: <></>}
            {!loading ? rentOut.length > 0 ? 
            <>
                <div className="row">
                    <h2>Current Rentals</h2>
                    <table>
                    <tr><th>Title</th><th>Rating</th><th>Description</th><th>Rental Date</th></tr>
                        {rentOut.map((row,index)=>index>=step2*numRows && index < ((step2+1)*numRows > rentOut.length-1 ? rentOut.length : (step2+1)*numRows)? (<tr>
                            {row.map((data, index)=>(index === 0 ? 
                            undefined : <td>{index === 1 ? <div>{data}</div> : data}</td>
                        ))}
                        <td><button className="delete" onClick={()=>onClickReturn(rentOut[index][0])}>Return</button></td>
                        </tr>): <></>)}
                    </table>
                </div>
                <div>
                    {rentOut.length / numRows <= 1 ? <></> :
                    <Paging maxStep={Math.round(rentOut.length/numRows)} setStep={setStep2} step={step2}/>
                    }
                </div>
            </>
            :
            <div className="row">
                <h2>No Movies Rented Out Yet!</h2> 
            </div> : <></>}
        </>
    );
}