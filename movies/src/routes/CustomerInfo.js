import axios from 'axios';
import { useEffect, useState } from 'react';
import Paging from './Paging';
const backendURL = `http://localhost:8000`;

export default function CustomerInfo({custId}){
    const [rentalInfo, setRentalInfo] = useState([]);
    const [step, setStep] = useState(0);
    const numRows = 5;
    const maxStep = Math.floor(rentalInfo.length/numRows);
    
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
        <div className="labels">
            <table>
                <tbody>
                    {rentalInfo.map((data, rowIndex)=>rowIndex>=step*numRows && rowIndex < ((step+1)*numRows > rentalInfo.length ? rentalInfo.length : (step+1)*numRows)? (<tr>
                        {data.map((i)=>(<td>
                            {i}
                        </td>))}
                    </tr>): <></>)}
                </tbody>
            </table>
        </div>
        <div className="footer">
        {rentalInfo.length / numRows <= 1 ? <></> :
            <Paging maxStep={maxStep} setStep={setStep} step={step}/>}
        </div>
        </>
    );
}