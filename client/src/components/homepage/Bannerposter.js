import "../../assets/css/Banner.css";
import { useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Bannerposter({ movie, cast, homepage }) {
  const [trailerUrl, setTrailerUrl] = useState(false);
  function truncate(str, n) {
    if (homepage) n = 200;

    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name)
        .then((url) => {
          console.log(url, movie.name);
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams);
          setTrailerUrl(urlParams.get("v"));
          console.log(trailerUrl);
        })
        .catch((error) => console.log(error, movie.name));
    }
  };

  return (
    <header>
      {!trailerUrl && (
        <div
          className={`banner background__poster ${
            homepage ? "banner_homepage" : ""
          }`}
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          }}
        >
          <div className="banner__contents">
            <h1 className="banner_title">
              {movie?.name || movie?.title || movie?.original_name}
            </h1>
            <div className="banner_buttons">
              <button
                className="banner__button"
                onClick={() => handleClick(movie)}
              >
                Play
              </button>
              <button className="banner__button">My List</button>
            </div>
            <h1 className="banner_description">
              {truncate(movie?.overview, 350)}
            </h1>
            <h1>{cast}</h1>
          </div>
          <div className="banner__fadebottom"></div>
        </div>
      )}

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

      {trailerUrl && (
        <button
          className="banner__button close__button"
          onClick={() => setTrailerUrl(false)}
        >
          Close Trailer
        </button>
      )}

      
    </header>
  );
}

export default Bannerposter;
