import axios from ".././axios";
import React, { useState, useEffect } from "react";
import requests from ".././requests";
import "../../assets/css/Banner.css";
import Bannerposter from "./Bannerposter";
function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      const request = await axios.get(requests.fetchNetflixOriginals);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );

      return request;
    }
    fetchdata();
  }, []);

  return <Bannerposter movie={movie} homepage></Bannerposter>;

  // return (
  //   <header>
  //     <div
  //       className="banner background__poster"
  //       style={{
  //         backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
  //       }}
  //     >
  //       <div className="banner__contents">
  //         <h1 className="banner_title">
  //           {movie?.name || movie?.title || movie?.original_name}
  //         </h1>
  //         <div className="banner_buttons">
  //           <button className="banner__button">Play</button>
  //           <button className="banner__button">My List</button>
  //         </div>
  //         <h1 className="banner_description">
  //           {truncate(movie?.overview, 200)}
  //         </h1>
  //       </div>
  //       <div className="banner__fadebottom"></div>
  //     </div>
  //   </header>
  // );
}

export default Banner;
