import { useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
const backendURL = `http://localhost:8000`;

export default function Edit(){
    const location = useLocation();
    const nav = useNavigate();
    const customer = location.state
    const [first, setFirst] = useState(customer[1]);
    const [last, setLast] = useState(customer[2]);
    const [email, setEmail] = useState(customer[3]);
    const [address, setAddress] = useState(customer[4]);
    const [check, setCheck] = useState(customer[5]);
    const [store, setStore] = useState(customer[6]);
    const [phone, setPhone] = useState(customer[7]);
    const [country, setCountry] = useState(customer[8]);
    const [city, setCity] = useState(customer[9]);
    const [district, setDistrict] = useState(customer[10]);
    const [postal, setPostal] = useState(customer[11]);
    const editCustomers = async(customer) =>{
        try{
            const result = await axios.patch(`${backendURL}/customer/edit`, customer);
            const res = result.data;
            console.log(res);
            if(res === "same email"){
                window.alert("The email already exists");
            }else if(res === "invalid postal"){
                window.alert("The postal code doesn't exist");
            }else if(res === "invalid phone"){
                window.alert("This phone is already used by another person living in a different address");
            }else{
                nav('/customers');
            }
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
            phone:data.get("phone"),
            city:data.get("city"),
            district:data.get("district"),
            postal:data.get("postal"),
            country:data.get("country"),
            active:check
        }
        const re_email = /^[A-Za-z0-9]+[A-Za-z0-9._]+[A-Za-z0-9]+@[A-Za-z0-9]+[A-Za-z0-9.-]+[A-Za-z0-9]+\.[A-Za-z]{2,}$/
        if(!re_email.test(customer.email)){
            alert('Please enter a valid email address.');
            return;
        }
        const re_phone = /^[0-9\s]{9,12}$/
        if(!re_phone.test(customer.phone)){
            alert('Please enter a valid phone number.');
            return;
        }
        const re_address=/^[0-9\s]{1,3} [A-Za-z]+ [A-Za-z]+$/
        if(!re_address.test(customer.address)){
            alert('Please enter a valid address.');
            return;
        }
        const re_city=/^[A-Za-z]+ *[A-Za-z]*$/
        if(!re_city.test(customer.city)){
            alert('Please enter a valid city.');
            return;
        }
        const re_district=/^[A-Za-z]+ *[A-Za-z]*$/
        if(!re_district.test(customer.district)){
            alert('Please enter a valid district.');
            return;
        }
        const re_postal = /^[0-9\s]{6}$/
        if(!re_postal.test(customer.postal)){
            alert('Please enter a valid postal code.');
            return;
        }
        console.log(customer);
        editCustomers(customer);
    }
    return(
        <>        
            <div className='edit-form'>
                <button className="back" onClick={()=>(nav('/customers'))}>←</button>
                <form onSubmit={(e)=>handleFormSubmit(e, customer[0])}>
                    <h1>Edit {customer[1]} {customer[2]}'s Info:</h1>
                    <div className="grid">
                        <div className="field">
                            <label for="first">First Name</label><br></br>
                            <input name="first" id="first" value={first} onChange={(e)=>(setFirst(e.target.value))} required></input>
                        </div>
                        <div className="field">
                            <label for="last">Last Name</label><br></br>
                        <input name="last" id="last" value={last} onChange={(e)=>(setLast(e.target.value))} required></input>
                        </div>
                        <div className="field">
                            <label for="email">Email</label><br></br>
                            <input name="email" id="email" value={email} onChange={(e)=>(setEmail(e.target.value))} 
                            required></input>
                        </div>
                        <div className="field">
                            <label for="phone">Phone Number</label><br></br>
                            <input name="phone" id="phone" value={phone} onChange={(e)=>(setPhone(e.target.value))} 
                            minLength="9" maxlength="12" type="number"
                            required></input>
                        </div>
                        <div className="field">
                            <label for="address">Address</label><br></br>
                            <input name="address" id="address" value={address} onChange={(e)=>(setAddress(e.target.value))} 
                            required></input>
                        </div>
                        <div className="field">
                            <label for="city">City</label><br></br>
                            <input name="city" id="city" value={city} onChange={(e)=>(setCity(e.target.value))} 
                            required></input>
                        </div>
                        <div className="field">
                            <label for="district">District</label><br></br>
                            <input name="district" id="district" value={district} onChange={(e)=>(setDistrict(e.target.value))} 
                            required></input>
                        </div>
                        <div className="field">
                            <label for="postal">Postal Code</label><br></br>
                            <input name="postal" id="postal" value={postal} onChange={(e)=>(setPostal(e.target.value))}
                            minLength="6" maxlength="6" type="number"
                            ></input>
                        </div>
                    </div>
                    <label for="country">Country</label><br></br>
                    <select name="country" value={country} onChange={(e)=>(setCountry(e.target.value))}>
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="American Samoa">American Samoa</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bermuda">Bermuda</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bosnia">Bosnia</option>
                        <option value="Botswana">Botswana</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Brunei">Brunei</option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Cape Verde">Cape Verde</option>
                        <option value="Central African Republic">Central African Republic</option>
                        <option value="Chad">Chad</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoros">Comoros</option>
                        <option value="Congo">Congo</option>
                        <option value="Congo">Congo, the Democratic Republic of the</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Ivory Coast">Ivory Coast</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">Dominican Republic</option>
                        <option value="East Timor">East Timor</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">Equatorial Guinea</option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Greece">Greece</option>
                        <option value="Greenland">Greenland</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guadeloupe">Guadeloupe</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guinea-Bissau">Guinea-Bissau</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="India">India</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Iran">Iran</option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japan">Japan</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="North Korea">North Korea</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Lao">Lao People's Democratic Republic</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libya">Libya</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Macau">Macau</option>
                        <option value="North Macedonia">North Macedonia</option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Martinique">Martinique</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Micronesia">Micronesia, Federated States of</option>
                        <option value="Moldova">Moldova, Republic of</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau">Palau</option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">Papua New Guinea</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Romania">Romania</option>
                        <option value="Russian Federation">Russia</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                        <option value="Samoa">Samoa</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome and Principe">Sao Tome and Principe</option> 
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Slovakia">Slovakia</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Solomon Islands">Solomon Islands</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="South Korea">South Korea</option>
                        <option value="Spain">Spain</option>
                        <option value="SriLanka">Sri Lanka</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Swaziland">Swaziland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syria">Syria</option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Togo">Togo</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Serbia">Serbia</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                    </select><br></br><br></br>
                    <label for="store">Store</label>
                    <select name="store" id="store" value={store} onChange={(e)=>(setStore(e.target.value))}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select><br></br>
                    <label for="activity">Activity</label>
                    <input className="check" type="checkbox" id="activity" name="activity" checked={check} onChange={() => setCheck((s) => !s)}></input><br></br>
                    <button className="button">Submit</button>
                </form>
            </div>
        </>
    )
}