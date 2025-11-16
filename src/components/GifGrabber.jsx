import { useRef } from "react";

function GifGrabber({ gifs, status, error }) {
  const scrollRef = useRef(null);
  // creates a ref object to hold a reference to the scrollable gif container.

  const scroll = (direction) => {
    // defines a function to programmatically scroll the carousel.
    if (scrollRef.current) {
      // checks if the ref is attached.
      const scrollDistance = 300;
      // defines the scroll distance.

      const newScrollLeft =
        scrollRef.current.scrollLeft +
        (direction === "left" ? -scrollDistance : scrollDistance);
      // calculates the new horizontal scroll position.

      scrollRef.current.scrollTo({
        //  the scrolling action.
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  if (status === "loading") {
    // checks if the application is currently fetching data.
    return <p>loading gifs...</p>;
    // renders a loading message.
  }

  if (status === "error" && error) {
    // checks if there was a failure.
    return <p className="error">{error}</p>;
    // renders the specific error message.
  }

  if (gifs.length === 0 && status === "idle") {
    // checks if no gifs were found and if the initial idle state is active.
    return <p>start typing above to find some gifs!</p>;
    // renders instruction message.
  }

  return (
    <div className="carousel-container">
      <div
        className="gif-grabber"
        ref={scrollRef} // attaches the useref hook to the scrollable element.
      >
        {gifs.map((gif) => (
          // iterates over the 'gifs' array to render results.
          <div key={gif.id} className="gif-item">
            {/* container for each gif. */}
            <img
              src={gif.images.fixed_height.url}
              // data insertion into the dom.
              alt={gif.title}
              // sets the alt text.
            />
          </div>
        ))}
      </div>
      {/* scroll arrows  */}
      <div className="controls-row">
        <button className="arrow left-arrow" onClick={() => scroll("left")}>
          &lt; prev
        </button>
        <button className="arrow right-arrow" onClick={() => scroll("right")}>
          next &gt;
        </button>
      </div>
    </div>
  );
}

export default GifGrabber;
