import { useState } from "react";
import SearchBar from "./components/SearchBar";
import GifGrabber from "./components/GifGrabber";
import "./App.css";

const API_KEY = "nlR1KBPhlM4DpEfcmFwNgztGAmDofwlR";
const BASE_URL = "https://api.giphy.com/v1/gifs/search"; // api endpoint

function App() {
  // initializes state as an empty array -'setgifs' to update it and holds the search result
  const [gifs, setGifs] = useState([]); // array to store fetched gifs

  // initializes state as empty string, holds the text the user type
  const [Search, setSearch] = useState(""); // stores curent input value

  // initializes state to track the app api interaction state
  const [status, setStatus] = useState("idle"); //starting idle - neutral state

  // initializes state to hold error messages from the api call
  const [error, setError] = useState(null); //start at null

  return (
    <div className="app">
      <h1>The GIPHY GIF Searcher</h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={fetchGifs}
        isLoading={status === "loading"}
      />
      <GifGrabber gifs={gifs} status={status} error={error} />
    </div>
  );
}

export default App;
