function GifGrabber({ gifs, status, error }) {
  // destructures the props object into three essential variables: gifs (the array of results), status (the app's current state), and error (any error message)
  //conditional rendering
  if (status === "loading") {
    // checks if current status is 'loading
    // if true immediately stops execution and renders loading message
    return <p>Loading GIFS...</p>;
  }
  if (status === "error" && error) {
    // two conditions to make sure component only display error when truly failed  - avoids error box
    return <p className="error"> {error}</p>; // if both conditions match, renders feedback error message
  }
  if (gifs.length === 0 && status === "idle") {
    //only shows instruction when results list is empty.
    return <p>Type above to find your favorite GIFs!</p>;
    // if true renders instruction message
  }

  // lets display some GIFs already
  return (
    // container for GifGrabber
    <div className="gif-grabber">
      {gifs.map(
        (
          gif //iterates over gifs - changes object to element
        ) => (
          <div key={gif.id} className="gif-item">
            {/* / creates a container div for each individual gif result - key required for react. */}
            {/* accesses the specific image url- fulfills the requirement to insert some of the data retrieved into the dom */}
            <img src={gif.images.fixed_height.url} alt={gif.title} />
          </div>
        )
      )}
    </div>
  );
}

export default GifGrabber;
