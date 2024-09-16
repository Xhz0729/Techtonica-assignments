import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddEventForm from "../components/AddEventForm";

// Mock the fetch function globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        id: 1,
        name: "Event example",
        description: "Event's descriptions",
        date: "2024-09-16",
        location: "Austin",
        is_favorited: false,
      }),
  })
);

// Mock dispatch function
const mockDispatch = jest.fn();

describe("AddEventForm Component", () => {
  beforeEach(() => {
    // Clear mocks before each test
    fetch.mockClear();
    mockDispatch.mockClear();
  });

  it("should render the form", () => {
    render(<AddEventForm dispatch={mockDispatch} />);

    // Check if all form fields and button are rendered
    expect(screen.getByPlaceholderText("Event name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Date")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Location")).toBeInTheDocument();
    expect(screen.getByText("Add Event")).toBeInTheDocument();
  });

  it("should submit the form and dispatch ADD_EVENT action", async () => {
    render(<AddEventForm dispatch={mockDispatch} />);

    // Fill out the form fields
    fireEvent.change(screen.getByPlaceholderText("Event name"), {
      target: { value: "Event example" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Event's descriptions" },
    });
    fireEvent.change(screen.getByPlaceholderText("Location"), {
      target: { value: "Austin" },
    });
    fireEvent.change(screen.getByPlaceholderText("Date"), {
      target: { value: "2024-09-16" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Add Event"));

    // Check if fetch was called with the correct URL and method
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Event example",
        description: "Event's descriptions",
        date: "2024-09-16",
        location: "Austin",
        is_favorited: false,
      }),
    });

    // Check if the dispatch function was called with the correct action
    await screen.findByText("Add Event"); // Wait for async operation
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_EVENT",
      payload: {
        id: 1,
        name: "Event example",
        description: "Event's descriptions",
        date: "2024-09-16",
        location: "Austin",
        is_favorited: false,
      },
    });

    // Check if form fields are reset
    // Wait for the form fields to be reset
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Event name").value).toBe("");
      expect(screen.getByPlaceholderText("Description").value).toBe("");
      expect(screen.getByPlaceholderText("Location").value).toBe("");
      expect(screen.getByPlaceholderText("Date").value).toBe("");
    });
  });
});
