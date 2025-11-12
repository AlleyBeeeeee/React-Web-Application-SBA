function GifGrabber({gifs, status, error}) { // destructures the props object into three essential variables: gifs (the array of results), status (the app's current state), and error (any error message)
    //conditional rendering
if (status === 'loading') { // checks if current status is 'loading 
    //// if true immediately stops execution and renders loading message
    return <p>Loading GIFS...</p>
}
if (status=== 'error' && error) { // two conditions to make sure component only display error when truly failed  - avoids error box 
    return <p className="error"> {error}</p> // if both conditions match, renders feedback error message
}
if (gifs.length === 0 && status === 'idle') { //only shows instruction when results list is empty.

}
    return (  );
}

export default GifGrabber;{gifs, status, error}