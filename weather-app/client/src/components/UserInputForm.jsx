import React, { useRef } from "react";
import search_icon from "../assets/search.png";

const UserInputForm = ({ onSubmit }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const cityRef = useRef();
  const favoriteRef = useRef();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the onSubmit prop function passed from the parent
    onSubmit({
      username: nameRef.current.value,
      user_email: emailRef.current.value,
      city: cityRef.current.value,
      favorite: favoriteRef.current.checked,
    });
    // Clear the input fields after submission
   nameRef.current.value = '';
   emailRef.current.value = '';
   cityRef.current.value = '';
   favoriteRef.current.checked = false;  // Reset the checkbox
  };


  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" placeholder="Enter your name" required />
      <input
        ref={emailRef}
        type="email"
        placeholder="Enter your email"
        required
      />
      <input ref={cityRef} type="text" placeholder="Search city" required />
      <label>
        <input ref={favoriteRef} type="checkbox" />
        Save as favorite
      </label>
      <button type="submit">
        <img src={search_icon} alt="search icon" />
      </button>
    </form>
  );
};

export default UserInputForm;
