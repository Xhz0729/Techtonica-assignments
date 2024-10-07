import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter to provide routing context
import HomePage from "../components/HomePage";

describe("render homepage component", () => {
  it("should render HomePage component correctly", () => {
    // Wrap HomePage with BrowserRouter to provide routing context
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Assert that the heading is rendered
    expect(screen.getByText("Welcome to the Blog App")).toBeInTheDocument();

    // Assert that the paragraph is rendered
    expect(screen.getByText("Please choose an option:")).toBeInTheDocument();
  });
});
