import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./components/SearchBar";
import GifGrabber from "./components/GifGrabber";
import "./App.css";
import { fetchGifs, setSearch } from "./features/gif/gifSlice";

function App() {
  const dispatch = useDispatch();
  // HOOK TO GET THE DISPATCH FUNCTION, USED TO SEND ACTIONS TO THE STORE.

  // hooks to read state
  const gifs = useSelector((state) => state.gifs.data);
  // extracts the array of gifs.
  const status = useSelector((state) => state.gifs.status);
  // extracts the current status.
  const error = useSelector((state) => state.gifs.error);
  // extracts the current error message.
  const search = useSelector((state) => state.gifs.search);
  // extracts the current search term.

  //  initial load effect
  useEffect(() => {
    // runs only once when the component mounts.
    if (search) {
      // checks if the initial state loaded a search term from localstorage.
      dispatch(fetchGifs(search));
      // DISPATCHES THE API CALL IMMEDIATELY WITH THE LOADED SEARCH TERM.
    }
  }, []);

  // local handler function for searchbar to call
  const handleSearchClick = () => {
    if (search.trim()) {
      // checks if the search term is valid.
      dispatch(fetchGifs(search));
      // DISPATCHES THE ASYNC THUNK WITH THE CURRENT SEARCH STATE VALUE.
    }
  };

  return (
    <div className="app">
      <h1>gif-tionary</h1>
      <SearchBar
        // renders searchbar component.
        search={search}
        // passes current search state from redux as prop.
        setSearch={(term) => dispatch(setSearch(term))}
        // passes a function that dispatches the setSearch action with the new input value.
        onSearch={handleSearchClick}
        // passes the local handler to initiate the search.
        isLoading={status === "loading"}
        // passes boolean prop to disable the button while loading.
      />
      <GifGrabber gifs={gifs} status={status} error={error} />
      {/* renders gifgrabber compo passing the redux state data as props. */}
    </div>
  );
}

export default App;
