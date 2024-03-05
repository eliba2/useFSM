import fs from "fs";
import { Properties } from "./types";

const readData = (): Properties => {
    const json = fs.readFileSync(__dirname + "/data.json", "utf8");
    return JSON.parse(json);
};

const data = readData();

export default data;
