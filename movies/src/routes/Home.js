import {useState, useEffect} from 'react'
import axios from 'axios';
import MovieInfo from './MovieInfo';
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
    <>
    <div className="row">
      <div className="column">
        <table>
          <thead>
            <tr>
              <th>Top 5 Movies</th>
            </tr>
          </thead>
          <tbody>
            {top5Movies.map((data)=>(
            <tr key={data[0]}>
              <td><div onClick={()=>handleMovieSelect(data[0])}>{data[1]}</div></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="column">
        <table>
          <thead>
            <tr>
              <th>Top 5 actors</th>
            </tr>
          </thead>
          <tbody>
            {top5Actors.map((data)=>(
            <tr key={data[0]}>
              <td><div onClick={()=>handleActorSelect(data[0], `${data[1]} ${data[2]}`)}>{data[1]} {data[2]}</div></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="row">
      <div className="column">
        <div className="card">
          {movieSelect ? <MovieInfo link={`${backendURL}/movie/rented/${movie}`}/> : undefined}
        </div>
      </div>
      <div className="column">
        {actorSelect ? <ActorInfo actor={actor}/> : undefined}
      </div>
    </div>
    </>
  );
}