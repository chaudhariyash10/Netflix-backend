import axios from ".././axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import requests from "../requests";
import Bannerposter from "../homepage/Bannerposter";
import Row from "../homepage/Row";

import "../../assets/css/Homepage.css";
const API_KEY = "d94a34f28c45dd49be10aaeba955060b";
const url = `https://api.themoviedb.org/3/movie`;

function Moviepage() {
  let [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  let [cast, setCast] = useState(null);

  const getUrl = (genre) => {
    if (genre === "NETFLIX ORIGINALS") return requests.fetchNetflixOriginals;
    if (genre === "Trending Now") return requests.fetchTrending;
    if (genre === "Action Movies") return requests.fetchActionMovies;
    if (genre === "Comedy Movies") return requests.fetchComedyMovies;
    if (genre === "Romantic Movies") return requests.fetchRomanticMovies;
    if (genre === "Horror Movies") return requests.fetchHorrorMoviesfetc;
    if (genre === "Documentaries") return requests.fetchDocumentaries;
  };

  const params = useParams();

  const getSimilarMovies = (movie) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie?.id}/similar?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then((res) => {
        console.log(res);
      });
  };
  useEffect(() => {
    const [movieName, movieGenre] = params.id.split("&");
    axios
      .get(getUrl(movieGenre))
      .then((req) => {
        if (req.data && req.data.results) {
          let requiredMovie = req.data.results.find((movie) => {
            return (
              (movie.name || movie.title || movie.original_name) === movieName
            );
          });
          setMovie(requiredMovie);
          getSimilarMovies(requiredMovie);
          return requiredMovie;
        }
      })
      .then((res) => {
        axios
          .get(
            `${url}/${
              movie?.id || res?.id
            }/credits?api_key=${API_KEY}&language=en-US`
          )
          .then((res) => {
            const wholeCast = res.data.cast;
            const wholeCrew = res.data.crew;
            let reqCast = [];
            let reqCrew = [];

            for (let i = 0; i < Math.min(wholeCast.length, 3); i++)
              reqCast.push(wholeCast[i].name || wholeCast[i].original_name);

            for (let i = 0; i < Math.min(wholeCrew.length, 3); i++) {
              reqCrew.push(wholeCrew[i].name || wholeCrew[i].original_name);
            }
            setCast(reqCast);
            // console.log(res, reqCast, reqCrew);
            setLoading(true);
          });
      });
  }, []);

  return (
    <div>
      {!loading && <div>Loading...</div>}
      {loading && (
        <div>
          <Bannerposter movie={movie} />
          <Row
            fetchURL={`https://api.themoviedb.org/3/movie/${movie?.id}/similar?api_key=${API_KEY}&language=en-US&page=1`}
            title="Similar Movies"
            isLargeRow={true}
          />
        </div>
      )}
    </div>
  );
}

export default Moviepage;
