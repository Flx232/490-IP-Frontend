import {useState, useEffect} from 'react'
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
    const [custId, setCustId] = useState('');
    const numRows = 14;
    const maxStep = Math.round(movies.length/numRows);

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
        setCustId('');
        setMovie(0);
        setSelect(false);
    }

    function handleSelect(movieId){
        setMovie(movieId);
        setSelect(true);
    }

    function onType(e, state){
        state(e.target.value)
        setStep(0)
    }

    function onClose(){
        setMovie(0)
        setSelect(false);
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
                    <button>Clear</button>
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
            <div className = "modal" style={select ? {display:'block'} : {display:'none'}}>
                <div className="model-content">
                    {select ?<div className="card">
                        <div className='description'>
                            <button className="close" onClick={()=>(onClose() )}>&times;</button>
                        </div>
                        <MovieInfo link={`${backendURL}/movie/rented/${movie}`}>
                            <div className='rent'>
                                <form onSubmit={handleRentSubmit}>
                                    <label>Enter Customer Id</label>
                                    <input id='cu_id' value={custId} placeholder='' onChange={(e)=>(setCustId(Number(e.target.value)))}></input>
                                    <button disabled={!custId}>Rent</button>
                                </form>
                            </div>
                        </MovieInfo>
                    </div> : <></>}
                </div>
            </div>
            <div className="footer">
                {movies.length / numRows <= 1 ? <></> :
                <Paging maxStep={maxStep} setStep={setStep} step={step}/>
                }
            </div>
        </>
    );
}