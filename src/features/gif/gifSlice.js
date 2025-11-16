import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "nlR1KBPhlM4DpEfcmFwNgztGAmDofwlR";
const BASE_URL = "https://api.giphy.com/v1/gifs/search"; // api endpoint

// ajax
export const fetchGifs = createAsyncThunk(
  // defines an asynchronous function to handle the side effect
  "gifs/fetchGifs",
  // unique action type prefix for this thunk.

  async (searchTerm, { rejectWithValue }) => {
    //saves the current search term to localstorage immediately upon thunk execution.
    localStorage.setItem("lastGifSearch", searchTerm);

    const url = `${BASE_URL}?api_key=${API_KEY}&q=${encodeURIComponent(
      searchTerm
    )}&limit=25`;
    const response = await fetch(url);
    // executes the ajax request.

    if (!response.ok) {
      // checks for http error status codes.
      return rejectWithValue(`http error! status: ${response.status}`);
      // uses rejectwithvalue to dispatch a rejected action with the error message.
    }

    const data = await response.json();
    // parses the response body as json data.

    if (data.data.length === 0) {
      // checks if the returned data array is empty (no results).
      return rejectWithValue(
        `sorry! no gifs found for "${searchTerm}". try a different term.`
      );
      // rejects if no results are found, providing a user-friendly error.
    }

    return data.data;
    // returns the array of gifs, which becomes the action's payload on success.
  }
);

// initial state
const initialState = {
  // defines the initial state object for the 'gifs' slice.
  data: [],
  // array to store the fetched gif objects.
  status: "idle",
  // string to track the status of the api request.
  error: null,
  // variable to hold any error messages.
  search: localStorage.getItem("lastGifSearch") || "",
  // loads the initial search term from localstorage, or defaults to an empty string.
};

//  slice and reducers
export const gifSlice = createSlice({
  // creates the slice object.
  name: "gifs",
  // the name of the slice.
  initialState,
  // assigns the initial state.
  reducers: {
    // defines synchronous reducers (for simple state changes like user input).
    setSearch: (state, action) => {
      // defines the action and reducer logic for updating the search term input.
      state.search = action.payload;
      // directly modifies the state property using immer.
    },
  },
  extraReducers: (builder) => {
    // defines extrareducers to handle the three different stages of the fetchgifs thunk.
    builder
      .addCase(fetchGifs.pending, (state) => {
        // listens for the thunk starting ('pending' phase).
        state.status = "loading";
        // sets the status to 'loading'.
        state.error = null;
        // clears any previous error.
      })
      .addCase(fetchGifs.fulfilled, (state, action) => {
        // listens for the thunk completing successfully ('fulfilled' phase).
        state.status = "idle";
        // sets the status back to 'idle'.
        state.data = action.payload;
        // updates the 'data' array with the returned gifs (the payload).
      })
      .addCase(fetchGifs.rejected, (state, action) => {
        // listens for the thunk failing ('rejected' phase).
        state.status = "error";
        // sets the status to 'error'.
        state.error = action.payload || action.error.message;
        // sets the error message, preferring the custom error message from the thunk.
        state.data = [];
        // clears the previous gif results.
      });
  },
});

export const { setSearch } = gifSlice.actions;

export default gifSlice.reducer;
