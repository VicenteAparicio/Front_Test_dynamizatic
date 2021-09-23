// IMPORT MOTORS
import React, {useEffect, useState} from 'react';
import axios from 'axios';


const Management = () => {

    const [search, setSearch] = useState("");
    const [newMovie, setNewMovie] = useState({title:'',director:'',year:'',genre:'',actors:''});
    const [movies, setMovies] = useState([]);
    const [allowAdd, setAllowAdd] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(()=>{
        allMovies();
    },[]);

    const dataMovie = (e) => {
        setNewMovie({...newMovie, [e.target.name]: e.target.value});
    }

    // useEffect(() => {
    //     setFilteredMovies(
    //         movies.filter((movie) =>
    //             movie.title.toLowerCase().includes(search.toLowerCase())
    //         )
    //     );
    // }, [search, movies]);

    const allMovies = async () => {
        try{
            let res = await axios.get('http://127.0.0.1:8000/api/allmovies');
            console.log(res.data.data);
            setMovies(res.data.data);
        } catch (err) {
            console.log({message: err.message})
        }
    }

    const newReg = async () => {

        try {
            let body = {
                title: newMovie.title,
                director: newMovie.director,
                year: newMovie.year,
                genre: newMovie.genre,
                actors: newMovie.actors,
            }
            let res = await axios.post(`http://127.0.0.1:8000/api/createmovie`, body)
            if (res){
                setAllowAdd(false);
            }
        }
        catch (err) {
            console.log({message: err.message});
        }   
    }

    const stringSearch = (e) => {

    }

    // const searcher = (option, arg) => {
    //     switch(option){
    //         case 'titleSearch':
    //             if (arg.length>2){
    //                 setSearch(arg)
    //             } else {
    //                 setSearch('');
    //             }
    //             break;
    //         case 'actorSearch':
    //             if (arg.length>2){
    //                 setSearchActor(arg)
    //             } else {
    //                 setSearchActor('');
    //             }
    //             updateActors();
    //             break;
    //         default:
    //             break;
    //     }

    return (
        <div id="containerManager">
            <div className="optionsBar">
                {/* <input className="textSearch" type="string" name="title" placeholder="title" onChange={stringSearch}></input> */}
                <div className="button" onClick={()=>setAllowAdd(true)}>NEW</div>
            </div>
            {allowAdd && (
                <div className="data addNewMovie">
                    <input onFocus={(e) => e.target.value=''} className="inputsNewMovie dataTitle" type="text" name="title" onChange={dataMovie} placeholder="Title"></input>
                    <input onFocus={(e) => e.target.value=''} className="inputsNewMovie dataDirector" type="text" name="director" onChange={dataMovie} placeholder="Director"></input>
                    <input onFocus={(e) => e.target.value=''} className="inputsNewMovie dataYear" type="number" name="year" onChange={dataMovie} placeholder="Year"></input>
                    <input onFocus={(e) => e.target.value=''} className="inputsNewMovie dataGenre" type="text" name="genre" onChange={dataMovie} placeholder="Genre"></input>
                    <input onFocus={(e) => e.target.value=''} className="inputsNewMovie dataActors" type="text" name="actors" onChange={dataMovie} placeholder="Actors"></input>
                    
                    <div className="minibuttonBox">
                        <div className="minibutton" onClick={()=>newReg()}>ADD</div>
                        <div className="minibutton" onClick={()=>setAllowAdd(false)}>X</div>
                    </div>
                </div>
            )}
            
            <div className="containerMovies">

                <div className="data bar">
                    <div className="infoData dataTitle">TITLE</div>
                    <div className="infoData dataDirector">DIRECTOR</div>
                    <div className="infoData dataYear">YEAR</div>
                    <div className="infoData dataGenre">GENRE</div>
                    <div className="infoData dataActors">ACTORS</div>
                </div>

                {movies.map((movie, index)=>(
                    <div className="movieRow">
                        <div className="data" key={index}>
                            <div className="infoData dataTitle">{movie.title}</div>
                            <div className="infoData dataDirector">{movie.director}</div>
                            <div className="infoData dataYear">{movie.year}</div>
                            <div className="infoData dataGenre">{movie.genre.split(',').join(', ')}</div>
                            <div className="infoData dataActors">{movie.actors.split(',').join(', ')}</div> 
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Management;