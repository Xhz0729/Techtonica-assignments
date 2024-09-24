import request from "supertest";
import app from "../server.js";
import db from "../db/db-connection.js";

// mock the database query function
jest.mock("../db/db-connection.js");

// remove database interaction if you're using static data
describe("GET /animals//species", () => {
  it("should return a list of species", async () => {
    // mocking the successful return of individuals
    const mockSpecies = [
      { id: 1, common_name: "Red wolf" },
      { id: 2, common_name: "Tiger" },
    ];

    // mock the db.query to return the mock data
    db.query.mockResolvedValueOnce({ rows: mockSpecies });

    // perform the request to the endpoint
    const response = await request(app).get("/animals//species");

    // Assert that the response status code is 200
    expect(response.status).toBe(200);

    // Assert that the response body matches the mock data
    expect(response.body).toEqual(mockSpecies);
  });

  // test case for error handling
  it("should return 400 and error message when there is a query error", async () => {
    // mock the db.query to throw an error
    db.query.mockRejectedValueOnce(new Error("Query failed"));

    // perform the request to the endpoint
    const response = await request(app).get("/animals/species");

    // assert that the response status code is 400
    expect(response.status).toBe(400);

    // assert that the response body contains the error message
    expect(response.body).toEqual({ error: "Error fetching species." });
  });
});
