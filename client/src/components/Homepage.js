import React from "react";
import { Redirect } from "react-router-dom";
import "../assets/css/Homepage.css";
import requests from "./requests";
import Row from "./homepage/Row";
import Banner from "./homepage/Banner";
import Navbar from "./homepage/Navbar";

function Homepage() {
  let token = window.localStorage.getItem("token");

  if (token)
    return (
      <div className="App">
        <Navbar />
        <Banner />
        <Row
          title="NETFLIX ORIGINALS"
          fetchURL={requests.fetchNetflixOriginals}
          isLargeRow
        />
        <Row
          title="Trending Now"
          fetchURL={requests.fetchTrending}
          isLargeRow
        />
        <Row title="Top Rated" fetchURL={requests.fetchTopRated} isLargeRow />
        <Row
          title="Action Movies"
          fetchURL={requests.fetchActionMovies}
          isLargeRow
        />
        <Row
          title="Comedy Movies"
          fetchURL={requests.fetchComedyMovies}
          isLargeRow
        />
        <Row
          title="Romantic Movies"
          fetchURL={requests.fetchRomanticMovies}
          isLargeRow
        />
        <Row
          title="Horror Movies"
          fetchURL={requests.fetchHorrorMovies}
          isLargeRow
        />
        <Row
          title="Documentaries"
          fetchURL={requests.fetchDocumentaries}
          isLargeRow
        />
      </div>
    );
  else {
    //   console.log("Token Verification falied");
    return <Redirect to="/sign-in" />;
    // }
  }
}
export default Homepage;
