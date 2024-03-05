import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SimpleCounter from "..";

describe("SimpleCounter", () => {
    it('counter increase and decrease according to button click', () => {
        // Render the SimpleCounter component
        render(<SimpleCounter />);

        // Find the "+/-" buttons
        const plusButton = screen.getByText("+");
        const minusButton = screen.getByText("-");

        // Click the "+" button five times
        for (let i = 0; i < 5; i++) {
            fireEvent.click(plusButton);
        }
        fireEvent.click(minusButton);

        // Check if the count is 5
        expect(screen.getByText(/4/)).toBeInTheDocument();
    });
});
