function SearchBar({ search, setSearch, onSearch, isLoading }) {
  // defines the searchbar component.

  function handleSubmit(e) {
    // defines the function to handle the form submission.
    e.preventDefault();
    // prevents the default browser behavior (page reload).
    onSearch();
    // calls the prop function, which dispatches fetchgifs.
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={search}
        // binds the input value to state.
        onChange={(e) => setSearch(e.target.value)}
        // calls the prop function, which dispatches the setSearch redux action.
        placeholder="enter gifs search here.."
        disabled={isLoading}
        // disables the input when the api call is loading.
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "searching..." : "search"}
        {/* displays different text depending on the loading status. */}
      </button>
    </form>
  );
}

export default SearchBar;
