import {useState, useEffect} from 'react'
import axios from 'axios';
import MovieInfo from './MovieInfo';
const backendURL = `http://localhost:8000`;
export default function Movies(){
    const [movies, setMovies] = useState([]);
    const [filter, setFilter] = useState('');
    const [type, setType] = useState('title');
    const [select, setSelect] = useState(false);
    const [movie, setMovie] = useState(0);
    const [custId, setCustId] = useState('');
    const [step, setStep] = useState(0);
    const maxStep = Math.round(movies.length/20);

    useEffect(()=>{
        const fetchMovies = async() =>{
            if(filter){
                try{
                    const res = await axios.get(`${backendURL}/movie/${type}/${filter}`)
                    const data = (await res).data;
                    setMovies(data);
                }catch(error){
                    console.log(error);
                }
            }else{
                setMovies([]);
            }
        };
        if(filter)
            fetchMovies(filter);
    }, [filter, type]);

    function onType(e){
        setType(e.target.getAttribute('id'));
        setFilter(e.target.value);
    }

    function handleFilterSubmit(e){
        e.preventDefault();
        setFilter('');
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
                <input id='title' value={type==='title'?filter:''} onChange={(e)=>(onType(e))} disabled={filter && type!=='title'}></input>
                <label>Actor</label>
                <input id='actor' value={type==='actor'?filter:''} onChange={(e)=>(onType(e))} disabled={filter && type!=='actor'}></input>
                <label>Genre</label>
                <input id='genre' value={type==='genre'?filter:''} onChange={(e)=>(onType(e))} disabled={filter && type!=='genre'}></input>
                <button>Clear</button>
            </form>
            {console.log(step)}
            <table>
                {movies.map((row, index)=>index>=step*20 && index < ((step+1)*20 > movies.length ? movies.length : (step+1)*20)? (<tr>
                    {row.map((data, index)=>(index === 0 ? 
                        undefined : <th>{index === 1 ? <div onClick={()=>(handleSelect(row[0]))}>{data}</div> : data}</th>
                    ))}
                </tr>): <></>)}
            </table>
            {movies.length / 20 <= 1 ? <></> :
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