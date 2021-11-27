import React from 'react'
import movieimg from '../images/movie-img.jpg'


const Searchresults = ({val}) => {
    return (
        <>
        <div className='img-card'>
            <div className="card">
                <img className='img-fluid search_img' src={movieimg} alt="movie img"/>
                <h1 className='card-title'>{val.original_title}</h1>
            </div>
        </div>
        </>
    )
}

export default Searchresults
