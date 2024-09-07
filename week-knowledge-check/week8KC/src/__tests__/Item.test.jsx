import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import Item from "../components/item";

describe("Item component rendering", () => {
  test("renders Item component properly when text is provided", () => {
    // Render the Item component with a text prop
    render(<Item item={{ text: "Learn Testing" }} />);

    // Check if the item text is rendered
    const itemEle = screen.getByText(/Learn Testing/i);
    expect(itemEle).toBeInTheDocument();
  });
});
