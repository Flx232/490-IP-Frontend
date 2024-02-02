import {useState, useEffect} from 'react'
import axios from 'axios';
import MovieInfo from './MovieInfo';
const backendURL = `http://localhost:8000`;
export default function Movies(){
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [name, setName] = useState('');
    const [select, setSelect] = useState(false);
    const [movie, setMovie] = useState(0);
    const [custId, setCustId] = useState('');
    const [step, setStep] = useState(0);
    const numRows = 40;
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
        if(movieId !== movie)
            setMovie(movieId);
        else
            setSelect((s)=>!s);
    }

    function handleStep(symbol){
        if(symbol === '<<'){
            setStep(0);
        }else if(symbol === '>>'){
            setStep(maxStep);
        }else if(symbol === '<'){
            if(step > 0)
                setStep((s)=>s-1);
        }else{
            if(step < maxStep)
                setStep((s)=>s+1);
        }
    }

    return(
        <div>
            <form onSubmit={handleFilterSubmit}>
                <label>Title</label>
                <input id='title' value={title} onChange={(e)=>(setTitle(e.target.value))}></input>
                <label>Actor</label>
                <input id='actor' value={name} onChange={(e)=>(setName(e.target.value))}></input>
                <label>Genre</label>
                <input id='genre' value={genre} onChange={(e)=>(setGenre(e.target.value))}></input>
                <button>Clear</button>
            </form>
            {console.log(step)}
            <table>
                {movies.map((row, index)=>index>=step*numRows && index < ((step+1)*numRows > movies.length ? movies.length : (step+1)*numRows)? (<tr>
                    {row.map((data, index)=>(index === 0 ? 
                        undefined : <th>{index === 1 ? <div onClick={()=>(handleSelect(row[0]))}>{data}</div> : data}</th>
                    ))}
                </tr>): <></>)}
            </table>
            {movies.length / numRows <= 1 ? <></> :
                <>
                    <button onClick={()=>handleStep("<<")}>{"<<"}</button>
                    <button onClick={()=>handleStep("<")}>{"<"}</button>
                    <button onClick={()=>handleStep(">")}>{">"}</button>
                    <button onClick={()=>handleStep(">>")}>{">>"}</button>
                </>
            }
            {select ?
            <div>
                <MovieInfo link={`${backendURL}/movie/${movie}`}/>
                <form onSubmit={handleRentSubmit}>
                    <label>Enter Customer Id</label>
                    <input id='cu_id' value={custId} placeholder='' onChange={(e)=>(setCustId(Number(e.target.value)))}></input>
                    <button disabled={!custId}>Rent</button>
                </form>
            </div>:undefined}
        </div>
    );
}