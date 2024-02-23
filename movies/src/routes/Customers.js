import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import CustomerInfo from './CustomerInfo';
import Paging from './Paging';
import axios from 'axios';
const backendURL = `http://localhost:8000`;

export default function Customers(){
    const [customers, setCustomers] = useState([]);
    const [step, setStep] = useState(0);
    const [id, setId] = useState(0);
    const [select, setSelect] = useState(false);
    const [customer, setCustomer] = useState([]);
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const numRows = 12;
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

    function handleInfoClick(cust){
        setCustomer(cust);
        setSelect(true);
    }

    function handleDeleteClick(id){
        const deleteCustomer = async(id) =>{
            try{
                await axios.delete(`${backendURL}/customer/remove/${id}`);
                window.location.reload();
            }catch(error){
                console.log(error);
            }
        };
        deleteCustomer(id);
    }

    function onClose(){
        setCustomer([])
        setSelect(false);
    }

    function outsideModal(e){
        const card = document.querySelector('.card');
        if (card && !card.contains(e.target)) {
            setCustomer([]);
            setSelect(false);
        }
    }

    function onType(state, value){
        state(value)
        setStep(0)
    }

    return(
        <>
            <div className="form">
                <form onSubmit={handleFilterSubmit}>
                    <label>Customer Id</label>
                    <input id='id' value={first && last ? 0 : id} onChange={(e)=>(onType(setId, Number(e.target.value)))} disabled={id===0 && (first || last)}></input>
                    <label>First Name</label>
                    <input id='first' value={id ? '' : first} onChange={(e)=>(onType(setFirst, e.target.value))} disabled={id !== 0}></input>
                    <label>Last Name</label>
                    <input id='last' value={id ? '' : last} onChange={(e)=>(onType(setLast,e.target.value))} disabled={id !== 0}></input>
                    <button className='delete'>Clear</button>
                </form>
                <Link to="/add">
                    <div className='add'>
                        <button>Add Customer</button>
                    </div>
                </Link>
            </div>
            <div className="row">
                <table>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    {customers.map((row, rowIndex)=>rowIndex>=step*numRows && rowIndex < ((step+1)*numRows > customers.length ? customers.length : (step+1)*numRows)? (<tr>
                        {row.map((data, index)=>(
                            index !== 0 && index <=3 ? 
                            <>
                                <td><div>{data}</div></td>
                            </> : <></>))}
                        <td><button className="info" onClick={()=>handleInfoClick(customers[rowIndex])}>Info</button></td>
                        <td><button className="delete" onClick={()=>handleDeleteClick(customers[rowIndex][0])}>Delete</button></td>
                    </tr>): <></>)}
                </table>
            </div>
            <div className = "modal" style={select ? {display:'block'} : {display:'none'}} onClick={(e) => (outsideModal(e))}>
                <div className="modal-spacing">
                    {select ?<div className="card" style={{backgroundColor: "#fefefe", border: "1px solid #888"}}>
                        <div className='description'>
                            <button className="close" onClick={()=>(onClose() )}>&times;</button>
                        </div>
                        <div className='description'>
                            <h2>{customer[1]} {customer[2]} {customer[5] ? "(Active)" : "(Not Active)"}</h2>
                            <p>Email: {customer[3]} <span>|</span> Address: {customer[4]}
                            <br></br>
                            <br></br>
                            <CustomerInfo custId = {customer[0]}/></p>
                        </div>
                        
                        <Link to="/edit" state={customer}>
                            <div className='edit'>
                                <button>Edit</button>
                            </div>
                        </Link>
                    </div>:<></>}
                </div>
            </div>
            <div className="footer">
                {customers.length / numRows <= 1 ? <></> :
                    <Paging maxStep={maxStep} setStep={setStep} step={step}/>}
            </div>
        </>
    );
}