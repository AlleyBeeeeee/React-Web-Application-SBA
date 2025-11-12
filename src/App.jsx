import { useState } from "react";
import SearchBar from "./components/SearchBar";
// import GifGrabber from "./components/GifGrabber";
import "./App.css";

const API_KEY = "nlR1KBPhlM4DpEfcmFwNgztGAmDofwlR";
const BASE_URL = "https://api.giphy.com/v1/gifs/search"; // api endpoint

function App() {
  // initializes state as an empty array -'setgifs' to update it and holds the search result
  const [gifs, setGifs] = useState([]); // array to store fetched gifs

  // initializes state as empty string, holds the text the user type
  const [search, setSearch] = useState(""); // stores curent input value

  // initializes state to track the app api interaction state
  const [status, setStatus] = useState("idle"); //starting idle - neutral state

  // initializes state to hold error messages from the api call
  const [error, setError] = useState(null); //start at null - expected to eventually hold a complex data object or should indicate the complete absence of data

  // ajax implementation
  const fetchGifs = async () => {
    // function to handle api fetch

    if (!search.trim()) return;
    //checks if search is empty, if so function stops

    setStatus("Loading..."); // updates state to laoding to show user requested it
    setError("null"); // clears previous error if any
    setGifs([]); // clears previous search results
    try {
      const url = `${BASE_URL}?api_key=${API_KEY}&q=${encodeURIComponent(
        searchTerm
      )}&limit=25`; //api url, including the api key, the encoded search term, and a limit of 25 results
      // encodeRURIComponent - global JavaScript function that prepares a string for inclusion as a URL component
      const response = await fetch(url); // executes the ajax request and waits for the response

      if (!response.ok) {
        //checks http response status
        throw new Error(`http error! : ${response.status}`); // if  error, throws a new error object with the status code.
      }

      const data = await response.json(); //parses response as json, waits for completion

      if (data.data.length === 0) {
        //use data.data to access the array of GIFs - list of GIFs located inside a property named data within that top-level object
        setError(
          `Sorry! No GIFs were found for "${search}". Try a different term.`
        ); //error message if no results were found
      } else {
        setGifs(data.data); //updates gifs state with the array from api response
        setError(null); // makes sure error state is cleared
      }
      setStatus("idle"); // resets status state - confirms that the results are complete for the last request.
    } catch (e) {
      //catches any errors
      setError(`Search Failed: ${e.message}`);
      setStatus("error");
    }
  };

  return (
    // container for app
    <div className="app">
      <h1>Gif-Tionary</h1>
      <SearchBar // renders searchbar
        searchTerm={search} // passes current search state as prop
        setSearchTerm={setSearch} // passes setter function as a prop for input changes
        onSearch={fetchGifs} // passes function as a prop to be called when the search button is pressed
        isLoading={status === "loading"} // passes boolean prop to disable the button while the status is loading
      />
      {/* <GifGrabber gifs={gifs} status={status} error={error} /> */}
      {/* renders gifgrabber compo passing the current gif data, status, and error state as props  */}
    </div>
  );
}

export default App;
