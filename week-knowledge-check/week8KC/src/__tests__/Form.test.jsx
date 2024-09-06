import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test, vi } from "vitest";
import Form from "../components/form";

describe("Form Component rendering", () => {
  test("renders the Form component properlyy", () => {
    // Render the Header component
    render(<Form addItem={() => {}} />);

    // Check input and submit btn rendered
    const userInput = screen.getByPlaceholderText(/Enter an item/i);
    const submitBtn = screen.getByText(/Submit/i);

    expect(userInput ).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  test("check addItem function works in Form", () => {
    // create a mock function to track its execution with vi.fn method
    const fn = vi.fn()

    // Render the Form component with a mock addItem function
    render(<Form addItem={fn} />);

    // Get the input and submit button
    const userInput = screen.getByPlaceholderText(/Enter an item/i);
    const submitBtn = screen.getByText(/Submit/i);

    // Simulate typing in the input field
    fireEvent.change(userInput, { target: { value: "Learn Testing" } });
    expect(userInput.value).toBe("Learn Testing");

    // Simulate clicking the Submit button
    fireEvent.click(submitBtn);

    // Check if mockAddItem is called with the correct argument
    expect(fn).toHaveBeenCalledWith("Learn Testing");
  });
});
