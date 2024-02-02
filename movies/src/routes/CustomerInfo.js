import axios from 'axios';
import { useEffect, useState } from 'react';

export default function CustomerInfo({link1, link2}){
    const [customerInfo, setCustomerInfo] = useState([]);
    const [rentalInfo, setRentalInfo] = useState([]);
    
    useEffect (()=>{
        const fetchMovieInfo = async () => {
            try{
                const res1 = axios.get(link1);
                const res2 = axios.get(link2);
                const data1 = (await res1).data;
                const data2 = (await res2).data;
                setCustomerInfo(data1);
                setRentalInfo(data2);
            }catch(error){
                console.log(error);
            }
        }
        fetchMovieInfo();
    },[link1, link2]);

    return(
        <div>
            <table>
                <tbody>
                    {customerInfo.map((data)=>(<tr>
                        {data.map((i,index)=>(<th>
                            {index !== data.length-1 ? i : i===1 ? "active": "not active"}
                        </th>))}
                    </tr>))}
                </tbody>
            </table>
            <table>
                <tbody>
                    {rentalInfo.map((data)=>(<tr>
                        {data.map((i)=>(<th>
                            {i}
                        </th>))}
                    </tr>))}
                </tbody>
            </table>
        </div>
    );
}