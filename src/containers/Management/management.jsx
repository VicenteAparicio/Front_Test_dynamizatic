// IMPORT MOTORS
import React, {useEffect, useState} from 'react';
import axios from 'axios';


const Management = () => {

    const [search, setSearch] = useState("");

    // SAVE DATA TO REGISTER NEW MOVIE
    const [addMovie, setAddMovie] = useState({title:'',director:'',year:'',genre:'',actors:''});
    
    // SAVE ORIGINAL DATA FROM DATABASE
    const [movies, setMovies] = useState([]);

    // SAVE FILTER DATA TO APLY FILTERS WITHOUT MODIFY ORIGINAL INFO
    const [filteredMovies, setFilteredMovies] = useState([]);

    // SAVE MOVIE DATA TO BE UPDATED
    const [updateData, setUpdateData] = useState({id:'',title:'',director:'',year:'',genre:'',actors:''});
    
    // VISUAL INTERRUPTORS
    // SHOW NEW MOVIE REGISTER BOX
    const [allowAdd, setAllowAdd] = useState('');
    // SHOW EDITION MOVIE BOX
    const [updMovie, setUpdMovie] = useState('');
   

    useEffect(()=>{
        allMovies();
    },[]);

    useEffect(()=>{
        setFilteredMovies(movies);
    },[movies]);

    const dataMovie = (e) => {
        setAddMovie({...addMovie, [e.target.name]: e.target.value});
    }
    const updDataMovie = (e) => {
        setUpdateData({...updateData, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        setFilteredMovies(
            movies.filter((movie) =>
                movie.title.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, movies]);

    // SHOW ALL MOVIES AND SAVE ON HOOKS
    const allMovies = async () => {
        try{
            let res = await axios.get('http://127.0.0.1:8000/api/allmovies');

            setMovies(res.data.data);
            setFilteredMovies(res.data.data);
        } catch (err) {
            console.log({message: err.message})
        }
    }

    // CREATE NEW MOVIE
    const newMovie = async () => {

        try {
            let body = {
                title: addMovie.title,
                director: addMovie.director,
                year: addMovie.year,
                genre: addMovie.genre,
                actors: addMovie.actors,
            }
            

            let res = await axios.post(`http://127.0.0.1:8000/api/createmovie`, body)

            if (res){
                setMovies(res.data.data);
                setAllowAdd(false);
            }
        }
        catch (err) {
            console.log({message: err.message});
        }   
    }

    // UPDATE MOVIE
    const updateMovie = (data) => {
        setUpdMovie(true);
        setUpdateData(data);
    }

    const upMovie = async () => {
        try {
            let body = {
                movie_id: updateData.id,
                title: updateData.title,
                director: updateData.director,
                year: updateData.year,
                genre: updateData.genre,
                actors: updateData.actors,
            }
            console.log(body)
            let res = await axios.post(`http://127.0.0.1:8000/api/updatemovie`, body)

            if (res){
                setMovies(res.data.data);
                setUpdMovie(false);
            }
        }
        catch (err) {
            console.log({message: err.message});
        }  
    }

    // DELETE MOVIE
    const deleteMovie = async (id) => {
        try {
            let body = {
                movie_id: id,
            }

            let res = await axios.post(`http://127.0.0.1:8000/api/deletemovie`, body)

            if (res){
                setMovies(res.data.data);
            }
        }
        catch (err) {
            console.log({message: err.message});
        }   

    }

    const searcher = (arg) => {
        switch(arg.target.name){
            case 'title':
                if (arg.target.value.length>2){
                    setSearch(arg.target.value)
                } else {
                    setSearch('');
                }
                break;
            // case 'actorSearch':
            //     if (arg.length>2){
            //         setSearchActor(arg)
            //     } else {
            //         setSearchActor('');
            //     }
                // updateActors();
                // break;
            default:
                break;
        }
    }

    return (
        <div id="containerManager">
            
            <div className="optionsBar">
                <input className="textSearch" type="string" name="title" placeholder="title" onChange={(e)=>searcher(e)}></input>
                <div className="button" onClick={()=>setAllowAdd(true)}>NEW</div>
            </div>

            {allowAdd && (
                <div className="data addNewMovie">
                    <input className="inputsNewMovie dataTitle" type="text" name="title" onChange={dataMovie} placeholder="Title"></input>
                    <input className="inputsNewMovie dataDirector" type="text" name="director" onChange={dataMovie} placeholder="Director"></input>
                    <input className="inputsNewMovie dataYear" type="number" name="year" onChange={dataMovie} placeholder="Year"></input>
                    <input className="inputsNewMovie dataGenre" type="text" name="genre" onChange={dataMovie} placeholder="Genre"></input>
                    <input className="inputsNewMovie dataActors" type="text" name="actors" onChange={dataMovie} placeholder="Actors"></input>
                    
                    <div className="minibuttonBox">
                        <div className="minibutton" onClick={()=>newMovie()}>ADD</div>
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

                {filteredMovies.map((movie, index)=>(
                    <div className="movieRow" key={index}>
                        <div className="data" >
                            <div className="infoData dataTitle">{movie.title}</div>
                            <div className="infoData dataDirector">{movie.director}</div>
                            <div className="infoData dataYear">{movie.year}</div>
                            <div className="infoData dataGenre">{movie.genre}</div>
                            <div className="infoData dataActors">{movie.actors}</div> 
                        </div>
                        <div className="minibuttonBox">
                            <div className="minibutton" onClick={()=>updateMovie(movie)}>UPD</div>
                            <div className="minibutton" onClick={()=>deleteMovie(movie.id)}>X</div>
                        </div>
                    </div>
                ))}

            </div>

            {updMovie && (
                <div className="data addNewMovie red">
                    <input className="inputsNewMovie dataTitle" type="text" name="title" onChange={updDataMovie} placeholder={updateData.title}></input>
                    <input className="inputsNewMovie dataDirector" type="text" name="director" onChange={updDataMovie} placeholder={updateData.director}></input>
                    <input className="inputsNewMovie dataYear" type="number" name="year" onChange={updDataMovie} placeholder={updateData.year}></input>
                    <input className="inputsNewMovie dataGenre" type="text" name="genre" onChange={updDataMovie} placeholder={updateData.genre}></input>
                    <input className="inputsNewMovie dataActors" type="text" name="actors" onChange={updDataMovie} placeholder={updateData.actors}></input>
                    
                    <div className="minibuttonBox">
                        <div className="minibutton" onClick={()=>upMovie()}>ACCEPT</div>
                        <div className="minibutton" onClick={()=>setUpdMovie(false)}>X</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Management;