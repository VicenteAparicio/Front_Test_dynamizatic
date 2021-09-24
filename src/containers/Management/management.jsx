// IMPORT MOTORS
import React, {useEffect, useState} from 'react';
import axios from 'axios';


const Management = () => {

    let connection = "https://dynamizatest.herokuapp.com/api";

    // SEARCH HOOK
    const [sGroup, setSGroup] = useState({title:'', director:'',year:'',genre:'',actors:''})

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

    const dataMovie = (e) => {
        setAddMovie({...addMovie, [e.target.name]: e.target.value});
    }
    const updDataMovie = (e) => {
        setUpdateData({...updateData, [e.target.name]: e.target.value});
    }
    const searchGroup = (e) => {
        setSGroup({...sGroup, [e.target.name]: e.target.value});
    }

    // SEARCH FILTERS 
    useEffect(()=> {
        setFilteredMovies(
            movies.filter((movie)=>
                movie.title.toLowerCase().includes(sGroup.title.toLowerCase())
            )
        );
    }, [sGroup.title, movies])

    useEffect(()=> {
        setFilteredMovies(
            movies.filter((movie)=>
                movie.actors.toLowerCase().includes(sGroup.actors.toLowerCase())
            )
        );
    }, [sGroup.actors, movies])

    useEffect(()=> {
        setFilteredMovies(
            movies.filter((movie)=>
                movie.director.toLowerCase().includes(sGroup.director.toLowerCase())
            )
        );
    }, [sGroup.director, movies])

    useEffect(()=> {
        setFilteredMovies(
            movies.filter((movie)=>
                movie.genre.toLowerCase().includes(sGroup.genre.toLowerCase())
            )
        );
    }, [sGroup.genre, movies])

    useEffect(()=> {
        if (sGroup.year > 0){
            setFilteredMovies(
                movies.filter((movie)=>
                    movie.year === parseInt(sGroup.year)
                )
            );
        } else {
            setFilteredMovies(movies)
        }
    }, [sGroup.year, movies])

    // SHOW ALL MOVIES AND SAVE ON HOOKS
    const allMovies = async () => {
        try{
            let res = await axios.get(`${connection}/allmovies`);
    
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
            
            let res = await axios.post(`${connection}/createmovie`, body)

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

            let res = await axios.post(`${connection}/updatemovie`, body)

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

            let res = await axios.post(`${connection}/deletemovie`, body)

            if (res){
                setMovies(res.data.data);
            }
        }
        catch (err) {
            console.log({message: err.message});
        }   

    }



    return (
        <div id="containerManager">
            
            <div className="optionsBar">
                <div className="filters">
                    <input className="filterInputs" type="string" name="title" placeholder="title" onChange={(e)=>searchGroup(e)}></input>
                    <input className="filterInputs" type="string" name="director" placeholder="director" onChange={(e)=>searchGroup(e)}></input>
                    <input className="filterInputs" type="number" name="year" placeholder="year" onChange={(e)=>searchGroup(e)}></input>
                    <input className="filterInputs" type="string" name="genre" placeholder="genre" onChange={(e)=>searchGroup(e)}></input>
                    <input className="filterInputs" type="string" name="actors" placeholder="actors" onChange={(e)=>searchGroup(e)}></input>
                </div>
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