import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const backendURL = `http://localhost:8000`;

export default function Add(){
    const nav = useNavigate();
    const postCustomers = async(customer) =>{
        try{
            await axios.post(`${backendURL}/customer/add`, customer);
            nav('/customers');
        }catch(error){
            console.log(error);
        }
    };

    function handleFormSubmit(e){
        e.preventDefault();
        const data = new FormData(e.target);
        const customer = {
            first_name:data.get("first"),
            last_name:data.get("last"),
            store:data.get("store"),
            email:data.get("email"),
            address:data.get("address")
        }
        postCustomers(customer);
    }
    return(
        <>
            <div className='edit-form'>
                <button className="back" onClick={()=>(nav('/customers'))}>←</button>
                <form onSubmit={(e)=>handleFormSubmit(e)}>
                    <h1>Add in a new customer:</h1>
                    <label for="first">First Name</label><br></br>
                    <input name="first" id="first" required></input><br></br>
                    <label for="last">Last Name</label><br></br>
                    <input name="last" id="last" required></input><br></br>
                    <label for="address">Address</label><br></br>
                    <input name="address" id="address" required></input><br></br>
                    <label for="email">Email</label><br></br>
                    <input name="email" id="email" required></input><br></br>
                    <label for="store">Store</label>
                    <select name="store" id="store">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select><br></br>
                    <button className="button">Submit</button>
                </form>
            </div>
            
        </>
    )
}