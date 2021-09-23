// IMPORT MOTORS
import React, {useEffect, useState} from 'react';
import axios from 'axios';


const Management = () => {

    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(()=>{
        allMovies();
    },[]);

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
            // let res = await axios.get(`${connection}/movies/allmovies`, {headers: {'Authorization': `Basic ${props.logData.token}`}});
            console.log(res.data.data);
            setMovies(res.data.data);
        } catch (err) {
            console.log({message: err.message})
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
            </div>
            <div className="containerMovies">
                {movies.map((movie, index)=>(
                        <div className="movieBox">
                            <div className="movieCard" key={index}>
                                <div className="title">{movie.title}</div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Management;