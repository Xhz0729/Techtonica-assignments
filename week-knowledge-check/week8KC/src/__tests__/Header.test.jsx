import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../components/header";
import { describe, expect, test } from "vitest";

describe("Header component rendering", () => {
  test("render header component properly", () => {
    // Render the Header component
    render(<Header />);

    // check if the h1 and h4 elements display
    const h1Ele = screen.getByText(/Hello Techtonica!/i);
    expect(h1Ele).toBeInTheDocument(); // Corrected here

    const h4Ele = screen.getByText(/This is a Gratitud List/i);
    expect(h4Ele).toBeInTheDocument(); // Corrected here
  });
});
