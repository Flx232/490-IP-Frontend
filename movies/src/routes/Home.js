import {useState, useEffect} from 'react'
import axios from 'axios';
import MovieInfo from './MovieInfo';
import Table from './Table';
import ActorInfo from './ActorInfo';

const backendURL = `http://localhost:8000`;

export default function Home() {
  const [top5Movies, setTop5Movies] = useState([]);
  const [top5Actors, setTop5Actors] = useState([]);
  const [movieSelect, setMovieSelect] = useState(false);
  const [actorSelect, setActorSelect] = useState(false);
  const [movie, setMovie] = useState(0);
  const [actor, setActor] = useState({actorId:0, actorName:''});

  const fetchTop5 = async () => {
    try{
      const res1 = await axios.get(`${backendURL}/top5/movies`);
      const res2 = await axios.get(`${backendURL}/top5/actors`);
      const data1 = (await res1).data;
      const data2 = (await res2).data;
      setTop5Movies(data1);
      setTop5Actors(data2);
     }catch(error){
      console.log(error);
    }
  };

  function handleMovieSelect(movieId) {
    if(movieId !== movie)
      setMovie(movieId)
    else
      setMovieSelect((s)=>!s);
  }

  function handleActorSelect(actorId, actorName) {
    const newActor = {actorId:actorId, actorName:actorName}
    if(actor.actorId !== newActor.actorId)
      setActor((s) => s=newActor)
    else
      setActorSelect((s)=>!s);
  }

  useEffect(()=>{
    fetchTop5();
  }, []);
  
  return (
    <div>
      <Table type="Top 5 movies">
        {top5Movies.map((data)=>(
        <tr key={data[0]}>
          <th><div onClick={()=>handleMovieSelect(data[0])}>{data[1]}</div></th>
        </tr>
        ))}
      </Table>
      <br></br>
      {movieSelect ? <MovieInfo link={`${backendURL}/movie/rented/${movie}`}/> : undefined}
      <br></br>
      <Table type="Top 5 actors">
        {top5Actors.map((data)=>(
        <tr key={data[0]}>
          <th><div onClick={()=>handleActorSelect(data[0], `${data[1]} ${data[2]}`)}>{data[1]} {data[2]}</div></th>
        </tr>
        ))}
      </Table>
      <br></br>
      {actorSelect ? <ActorInfo actor={actor}/> : undefined}
    </div>
  );
}