import { useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
const backendURL = `http://localhost:8000`;

export default function Edit(){
    const location = useLocation();
    const nav = useNavigate();
    const customer = location.state
    const [check, setCheck] = useState(customer[5]);
    const editCustomers = async(customer) =>{
        try{
            await axios.post(`${backendURL}/customer/edit`, customer);
            nav('/customers');
        }catch(error){
            console.log(error);
        }
    };

    function handleFormSubmit(e, cust_id){
        e.preventDefault();
        const data = new FormData(e.target);
        const customer = {
            id:cust_id,
            first_name:data.get("first"),
            last_name:data.get("last"),
            store:data.get("store"),
            email:data.get("email"),
            address:data.get("address"),
            active:check
        }
        editCustomers(customer);
    }
    return(
        <>        
            <div className='edit-form'>
                <button className="back" onClick={()=>(nav('/customers'))}>←</button>
                <form onSubmit={(e)=>handleFormSubmit(e, customer[0])}>
                    <h1>Edit {customer[1]} {customer[2]}'s Info:</h1>
                    <label for="first">First Name</label><br></br>
                    <input name="first" id="first"></input><br></br>
                    <label for="last">Last Name</label><br></br>
                    <input name="last" id="last"></input><br></br>
                    <label for="address">Address</label><br></br>
                    <input name="address" id="address"></input><br></br>
                    <label for="email">Email</label><br></br>
                    <input name="email" id="email"></input><br></br>
                    <label for="store">Store</label>
                    <select name="store" id="store">
                        <option value="1" selected={customer[6] === 1}>1</option>
                        <option value="2" selected={customer[6] === 2}>2</option>
                    </select><br></br>
                    <label for="activity">Activity</label>
                    <input className="check" type="checkbox" id="activity" name="activity" checked={check} onChange={() => setCheck((s) => !s)}></input><br></br>
                    <button className="button">Submit</button>
                </form>
            </div>
        </>
    )
}