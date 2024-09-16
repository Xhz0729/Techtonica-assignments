import React, { useContext, useState } from "react";
import { EventContext } from "../helper/Context";

const SearchEvent = ({ dispatch }) => {
  const [term, setTerm] = useState(""); // State to store the search term
  
  const {setGameState} = useContext(EventContext);

  // Handle form submission for search
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      // Make a GET request to the backend with the search term
      const response = await fetch(`http://localhost:8080/events/search?term=${term}`);
      const data = await response.json();

      // Dispatch the search results to the reducer
      dispatch({ type: 'SEARCH_EVENT', payload: data });
      setGameState("searchpage");
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search events"
          value={term}
          onChange={(e) => setTerm(e.target.value)} // Update state as user types
        />
        <button type="submit" className="searchButton">Search</button>
      </form>
    </div>
  );
};

export default SearchEvent;
