import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import App from '../App';

describe('Adding duplicated item', () => {
    test('render duplicated items', () => {
        // Render the App component
        render(<App />);

        // Get the input and submit button
        const userInput = screen.getByPlaceholderText(/Enter an item/i);
        const submitBtn = screen.getByText(/Submit/i);

        // Simulate typing in the input field
        fireEvent.change(userInput, { target: { value: "Xiahui's jellycats" } });

        // Simulate clicking the Submit button
        fireEvent.click(submitBtn);

        // Simulate typing in the input field again
        fireEvent.change(userInput, { target: { value: "Xiahui's jellycats" } });

        // Simulate clicking the Submit button again
        fireEvent.click(submitBtn);

        // Check that the duplicated item is displayed
        const duplicatedItem = screen.getAllByText("Xiahui's jellycats");
        expect(duplicatedItem.length).toBe(2);
    });
});