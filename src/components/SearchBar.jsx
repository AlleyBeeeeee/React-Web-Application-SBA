//defines the searchbar component, accepting props from App.jsx.
function SearchBar({ search, setSearch, onSearch, isLoading }) {
  //set current value, updates parent state, form handler to trigger api call, set disabled search button

  function handleSubmit(e) {
    e.preventDefault(); // prevents default browser behavior
    onSearch(); // calls fetchgif() (makes ajax request)
  }
  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={search} // binds the input value to the searchTerm state.
        onChange={(e) => setSearch(e.target.value)} // attaches event listener/  fires every time theres updates the search state
        placeholder="Enter GIFs search here.."
        disabled={isLoading} // disables the input while the api call is loading
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
        {/* if loading is ture, show searching */}
        {/* displays different text depending on the loading status. */}
      </button>
    </form>
  );
}
export default SearchBar;
