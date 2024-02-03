import {useState, useEffect} from 'react'
import CustomerInfo from './CustomerInfo';
import Paging from './Paging';
import axios from 'axios';
const backendURL = `http://localhost:8000`;

export default function Customers(){
    const [customers, setCustomers] = useState([]);
    const [step, setStep] = useState(0);
    const [id, setId] = useState(0);
    const [select, setSelect] = useState(false);
    const [customer, setCustomer] = useState(0);
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const numRows = 13;
    const maxStep = Math.floor(customers.length/numRows);

    useEffect(()=>{
        const fetchCustomers = async() =>{
            try{
                const res = await axios.get(`${backendURL}/customers/info?id=${id}&first=${first}&last=${last}`)
                const data = (await res).data;
                setCustomers(data);
            }catch(error){
                console.log(error);
            }
        };
        fetchCustomers();
    }, [first, id, last]);

    function handleFilterSubmit(e){
        e.preventDefault();
        setId(0)
        setFirst('')
        setLast('')
    }

    function handleInfoClick(id){
        if(id !== customer)
            setCustomer(id);
        else
            setSelect((s)=>!s);
    }

    return(
        <>
            <div className="form">
                <form onSubmit={handleFilterSubmit}>
                    <label>Customer Id</label>
                    <input id='id' value={id} onChange={(e)=>(setId(Number(e.target.value)))}></input>
                    <label>First Name</label>
                    <input id='first' value={first} onChange={(e)=>(setFirst(e.target.value))}></input>
                    <label>Last Name</label>
                    <input id='last' value={last} onChange={(e)=>(setLast(e.target.value))}></input>
                    <button>Clear</button>
                </form>
            </div>
            <div className="row">
                <table>
                    {customers.map((row, rowIndex)=>rowIndex>=step*numRows && rowIndex < ((step+1)*numRows > customers.length ? customers.length : (step+1)*numRows)? (<tr>
                        {row.map((data, index)=>(
                            index !== 0 ? 
                            <>
                                <td><div>{data}</div></td>
                            </> : <></>))}
                        <td><button className="info" onClick={()=>handleInfoClick(customers[rowIndex][0])}>Info</button></td>
                        <td><button className="delete">Delete</button></td>
                    </tr>): <></>)}
                </table>
            </div>
            {select ?
            <CustomerInfo link1={`${backendURL}/customer/${customer}`} link2={`${backendURL}/rental/${customer}`}/>:undefined}
            <div className="footer">
                {customers.length / numRows <= 1 ? <></> :
                    <Paging maxStep={maxStep} setStep={setStep} step={step}/>}
            </div>
        </>
    );
}