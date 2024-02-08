import { useState } from "react";

const key = process.env.REACT_APP_API

export default function MovieSearch() {
    

    const [movieTitle, setMovieTitle] = useState('')
    const [movieYear, setMovieYear] = useState('')
    const [poster, setPoster] = useState('blankPoster.jpg');

    const handlTitleChange = (event) => {
        setMovieTitle(event.target.value)
        
    }

    const handlYearChange = (event) => {
        setMovieYear(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            // Make a POST request to the API endpoint
            const response = await fetch(`https://www.omdbapi.com/?t=${movieTitle}&y=${movieYear}&apikey=${key}`)
            // Check if the response is successful
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse the JSON data from the response
            const result = await response.json();
            setPoster(result.Poster)
            console.log(poster)


            } catch (error) {
                console.error('Error submitting movie data:', error);
            }

    }

    return (
        <div>
            <h2>Movie Search</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="singleInput">Enter Movie Title (required):     </label>
                <input
                    type="text"
                    id="title"
                    value={movieTitle}
                    onChange={handlTitleChange}
                    required
                />
                <br/>

                <label htmlFor="singleInput">Enter Year: </label>
                <input
                    type="text"
                    id="year"
                    value={movieYear}
                    onChange={handlYearChange}
                />
                <br/>

                <button type="submit">Find Movie</button>
                <br/>
                <br/>
                <img src={poster} alt='Movie Poster'/>


            </form>
        </div>
    )
}
