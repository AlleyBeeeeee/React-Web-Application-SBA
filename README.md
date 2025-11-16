GIF-Tionary: GIF Finder
This application is designed to search and display GIFs using the GIPHY API. The project serves as a comprehensive demonstration of core modern web development concepts, including AJAX fetching, state persistence, and implementing UI modules.

Technologies Used

React
HTML, CSS, JavaScript
Framework for building the component-based, dynamic User Interface.

React Hooks
useState, useEffect
Used for managing all state (useState) and side-effects (useEffect, useCallback, useRef).

AJAX (fetch)
AJAX Request to External Data Source
Handles asynchronous communication with the GIPHY API within the fetchGifs function.

localStorage
Save data to the user's browser
Used to persist the user's last search term between browser sessions.

CSS Scroll Snap
Complex User Interface Module
Implements the Carousel functionality, allowing GIF items to snap into center view during horizontal scrolling.
Netlify
Hosted on Netlify
Used for continuous deployment (CD) linked directly to the GitHub repository.

Unsolved Problems / Future Enhancements
Error Handling: Implement visual feedback on the arrows.
Pagination: Implement infinite scroll to load more results as the user scrolls horizontally, optimizing API usage.
User Feedback: Implement a debounce function to delay the search query until the user pauses typing, reducing unnecessary API calls during data entry.
