import { useState } from "react";
import "./App.css";

const API_KEY = "nlR1KBPhlM4DpEfcmFwNgztGAmDofwlR";
const BASE_URL = "https://api.giphy.com/v1/gifs/search"; // api endpoint

function App() {
  // initialize state as an empty array -'setgifs' to update it and holds the search result
  const [gifs, setGifs] = useState([]); // array to store fetched gifs

  // initialize state as empty string, holds the text the user type
  const [Search, setSearch] = useState(""); // stores curent input value
  return <></>;
}

export default App;
