import { http, HttpResponse } from "msw";
import { PropertiesMockData } from "./data";

export const handlers = [
    http.get("/properties", () => {
        return HttpResponse.json(PropertiesMockData);
    }),
    http.get("/badproperties", () => {
        return new HttpResponse(null, {
            status: 401,
            statusText: "Bad Mock Request",
        });
    }),
];
