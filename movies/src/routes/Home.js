import {useState, useEffect} from 'react'
import axios from 'axios';
import MovieInfo from './MovieInfo';
import ActorInfo from './ActorInfo';

const backendURL = `http://localhost:8000`;

export default function Home() {
  const [top5Movies, setTop5Movies] = useState({});
  const [top5Actors, setTop5Actors] = useState({});
  const [loading, setLoading] = useState(true);
  const [movieSelect, setMovieSelect] = useState(false);
  const [actorSelect, setActorSelect] = useState(false);
  const [movie, setMovie] = useState(0);
  const [actor, setActor] = useState({actorId:0, actorName:''});

  const fetchTop5 = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  function handleMovieSelect(movieId) {
    setMovieSelect((s)=>!s);
    setMovie(movieId)
  }

  function handleActorSelect(actorId, actorName) {
    setActorSelect((s)=>!s);
    const newActor = {actorId:actorId, actorName:actorName}
    setActor((s) => s=newActor)
  }

  useEffect(()=>{
    fetchTop5();
  }, []);
  
  return (
    <div>
      {loading ? <div></div> :
      <>
        <table>
          <thead>
            <tr key="column_header">
              <th key="movies">Top 5 Movies</th>
            </tr>
          </thead>
          <tbody>
          {/* {data.map((i)=>(<th key={i}>{i}</th>))} */}
            {top5Movies.data.map((data)=>(<tr key={data[0]}><th><div onClick={()=>handleMovieSelect(data[0])}>{data[1]}</div></th></tr>))}
          </tbody>
        </table>
        <br></br>
        {movieSelect ? <MovieInfo movieId={movie} select={movieSelect}/> : undefined}
        <br></br>
        <table>
          <thead>
            <tr key="Column Names">
              <th key="actors">Top 5 Actors</th>
            </tr>
          </thead>
          <tbody>
            {top5Actors.data.map((data)=>(<tr key={data[0]}><th><div onClick={()=>handleActorSelect(data[0], `${data[1]} ${data[2]}`)}>{data[1]} {data[2]}</div></th></tr>))}
          </tbody>
        </table>
        <br></br>
        {actorSelect ? <ActorInfo actor={actor} select={actorSelect}/> : undefined}
      </>
      }
    </div>
  );
}