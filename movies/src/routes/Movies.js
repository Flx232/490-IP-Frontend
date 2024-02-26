import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Paging from './Paging';
import MovieInfo from './MovieInfo';
const backendURL = `http://localhost:8000`;
export default function Movies(){
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [name, setName] = useState('');
    const [select, setSelect] = useState(false);
    const [movie, setMovie] = useState(0);
    const [step, setStep] = useState(0);
    const [total, setTotal] = useState(0);
    const numRows = 14;
    const maxStep = Math.round(movies.length/numRows);
    const rentMovie = async(rent) =>{
        try{
            await axios.post(`${backendURL}/movie/rent`, rent);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        const fetchMovies = async() =>{
            try{
                const res = await axios.get(`${backendURL}/movie/info?title=${title}&actor=${name}&genre=${genre}`)
                const data = (await res).data;
                setMovies(data);
            }catch(error){
                console.log(error);
            }
        };
        fetchMovies();
    }, [genre, name, title]);

    function handleFilterSubmit(e){
        e.preventDefault();
        setTitle('');
        setGenre('');
        setName('');
    }

    function handleRentSubmit(e){
        e.preventDefault();
        const data = new FormData(e.target);
        const rent = {
            customer_id:data.get("customer"),
            staff_id:data.get("staff"),
            film_id:movie
        }
        setMovie(0);
        setSelect(false);
        rentMovie(rent);
    }

    function handleSelect(movieId){
        const fetchMovieStock = async() =>{
            try{
                const res = await axios.get(`${backendURL}/movie/total/${movieId}`)
                const data = (await res).data;
                setTotal(data);
                setMovie(movieId);
                setSelect(true);
            }catch(error){
                console.log(error);
            }
        };
        fetchMovieStock();
    }

    function onType(e, state){
        state(e.target.value)
        setStep(0)
    }

    function onClose(){
        setMovie(0)
        setSelect(false);
    }

    function outsideModal(e){
        const card = document.querySelector('.card');
        if (card && !card.contains(e.target)) {
            setMovie(0);
            setSelect(false);
        }
    }

    return(
        <>
            <div className="form">
                <form onSubmit={handleFilterSubmit}>
                    <label>Title</label>
                    <input id='title' value={title} onChange={(e)=>(onType(e, setTitle))}/>
                    <label>Actor</label>
                    <input id='actor' value={name} onChange={(e)=>(onType(e, setName))}/>
                    <label>Genre</label>
                    <input id='genre' value={genre} onChange={(e)=>(onType(e, setGenre))}/>
                    <button className="delete">Clear</button>
                </form>
            </div>
            <div className="row">
                <table>
                    <tr><th>Title</th><th>Rating</th><th>Description</th></tr>
                    {movies.map((row, index)=>index>=step*numRows && index < ((step+1)*numRows > movies.length-1 ? movies.length : (step+1)*numRows)? (<tr>
                        {row.map((data, index)=>(index === 0 ? 
                            undefined : <td>{index === 1 ? <div onClick={()=>(handleSelect(row[0]))}>{data}</div> : data}</td>
                        ))}
                    </tr>): <></>)}
                </table>
            </div>
            <div className="footer">
                {movies.length / numRows <= 1 ? <></> :
                <Paging maxStep={maxStep} setStep={setStep} step={step}/>
                }
            </div>
            <div className = "modal" style={select ? {display:'block'} : {display:'none'}} onClick={(e) => (outsideModal(e))}>
                <div className="modal-spacing">
                    {select ?<div className="card" style={{backgroundColor: "#fefefe", border: "1px solid #888"}}>
                        <div className='description'>
                            <button className="close" onClick={()=>(onClose() )}>&times;</button>
                            <h2>Total number in Stock: {total[0][0]}</h2>
                        </div>
                        <MovieInfo link={`${backendURL}/movie/rented/${movie}`}>
                            <div className='rent'>
                                <form onSubmit={handleRentSubmit}>
                                    <label for="customer">Enter Customer Id</label>
                                    <input name="customer" id="customer" required></input>
                                    <label for="staff">Staff Id</label>
                                    <select name="staff" id="staff">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                    <button disabled={total[0][0] === 0}>Rent</button>
                                </form>
                            </div>
                        </MovieInfo>
                        <div className="labels">
                            <Link to="/manage" state={movie}>
                                <div className='manage'>
                                    <button>Manage</button>
                                </div>
                            </Link>
                        </div>
                    </div> : <></>}
                </div>
            </div>
        </>
    );
}