import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Register from "../components/Register";

describe("Register Component", () => {
  it("should render the form and inputs correctly", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Check that the input fields and button are rendered
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Register" })
    ).toBeInTheDocument();
  });

  it("should allow users to fill out the form", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    // Simulate user typing into the inputs
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "user101" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "user101@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "user101" },
    });

    // Assert that the values have been updated
    expect(screen.getByPlaceholderText("Username").value).toBe("user101");
    expect(screen.getByPlaceholderText("Email").value).toBe(
      "user101@gmail.com"
    );
    expect(screen.getByPlaceholderText("Password").value).toBe("user101");
  });
});
