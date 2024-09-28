import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactDetails from "../components/ContactDetails";
import React from "react";

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          first_name: "Dou",
          last_name: "Zhang",
          email: "Dou@example.com",
          phone_number: "123-456-7890",
          street: "350 Cypress Rd",
          city: "Austin",
          state: "TX",
          zip_code: "78613",
          notes: "Dou dou is a cute cat",
          image_url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMRDgO2-tIyCFfrxFil7tKXyqfOg4R5_RZ2A&s",
        },
      ]),
  })
);

describe("ContactDetails Component", () => {
  it("renders contact details correctly", async () => {
    render(<ContactDetails />);

    // Wait for the first name to appear in the document after fetch is resolved
    await waitFor(() => {
      expect(screen.getByText("First Name: Dou")).toBeInTheDocument();
    });

    // Additional assertions can be added here as needed
    expect(screen.getByText("Last Name: Zhang")).toBeInTheDocument();
    expect(screen.getByText("Email: Dou@example.com")).toBeInTheDocument();
    expect(screen.getByText("Phone Number: 123-456-7890")).toBeInTheDocument();
    expect(
      screen.getByText("Address: 350 Cypress Rd, Austin, TX 78613")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Notes: Dou dou is a cute cat")
    ).toBeInTheDocument();
    expect(screen.getByAltText("Image of Dou")).toHaveAttribute(
      "src",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMRDgO2-tIyCFfrxFil7tKXyqfOg4R5_RZ2A&s"
    );
  });
});
