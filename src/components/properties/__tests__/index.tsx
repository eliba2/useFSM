import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import PropertiesComponent from "..";
import { server } from "../../../mocks/node";
import { BAD_MOCK_DATA_TEXT, PropertiesMockData } from "../../../mocks/data";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("PropertiesComponent", () => {
    it("receives a mocked response to a REST API request", async () => {
        const response = await fetch("/properties");
        expect(response.status).toBe(200);
        expect(response.statusText).toBe("OK");
        expect(await response.json()).toEqual(PropertiesMockData);

        const badresponse = await fetch("/badproperties");
        expect(badresponse.status).toBe(401);
        expect(badresponse.statusText).toBe(BAD_MOCK_DATA_TEXT);
    });

    test("fetches and displays properties", async () => {
        render(<PropertiesComponent />);
        const fetchButton = screen.getByText("Fetch");
        fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(screen.getByText("Ramat-Gan")).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.getByText("Bialik")).toBeInTheDocument();
        });
    });

    test("handles fetch error correctly", async () => {
        render(<PropertiesComponent />);
        const fetchErrorButton = screen.getByText("FetchError");
        fireEvent.click(fetchErrorButton);

        await waitFor(() => {
            expect(screen.getByText("can't get houses")).toBeInTheDocument();
        });
    });
});
