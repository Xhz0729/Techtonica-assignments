import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserInputForm from "../components/UserInputForm";
// Helper function to fill form fields
const fillFormFields = ({ name, email, city, favorite }) => {
  fireEvent.change(screen.getByPlaceholderText("Enter your name"), {
    target: { value: name },
  });
  fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
    target: { value: email },
  });
  fireEvent.change(screen.getByPlaceholderText("Search city"), {
    target: { value: city },
  });

  if (favorite) {
    fireEvent.click(screen.getByLabelText("Save as favorite"));
  }
};

// Helper function to submit the form
const submitForm = () => {
  fireEvent.submit(screen.getByRole("button"));
};

describe("UserInputForm Component", () => {
  it("should submit the correct form data", () => {
    const mockOnSubmit = jest.fn();

    // Render the component
    render(<UserInputForm onSubmit={mockOnSubmit} />);

    // Fill out the form fields and submit
    fillFormFields({
      name: "Doudou",
      email: "dou@example.com",
      city: "New York",
      favorite: true,
    });
    submitForm();

    // Check if the mock function was called with the correct data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      username: "Doudou",
      user_email: "dou@example.com",
      city: "New York",
      favorite: true,
    });
  });

  it("should reset the city field and checkbox after form submission", () => {
    const mockOnSubmit = jest.fn();

    // Render the component
    render(<UserInputForm onSubmit={mockOnSubmit} />);

    // Fill out the form fields and submit
    fillFormFields({
      name: "Doudou",
      email: "dou@example.com",
      city: "New York",
      favorite: true,
    });
    submitForm();

    // After submission, the city field should be empty and the checkbox should be unchecked
    expect(screen.getByPlaceholderText("Search city").value).toBe("");
    expect(screen.getByLabelText("Save as favorite").checked).toBe(false);
  });
});
