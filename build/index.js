"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const app = (0, express_1.default)();
const port = 3000;
const data = fs_1.default.readFileSync("./endpoints.json").toString();
const parsedData = JSON.parse(data);
const mappedData = Object.entries(parsedData);
const endpoints = mappedData.map((i) => i[1]);
endpoints.map((e) => console.log(e));
app.use(express_1.default.json());
endpoints.map((endpoint) => {
    const reqHandle = (req, res) => {
        endpoint.expected ? res.json(endpoint.expected) : res.send("OK");
    };
    switch (endpoint.type) {
        case "get":
            {
                app.get(endpoint.dir, reqHandle);
            }
            break;
        case "post":
            {
                app.post(endpoint.dir, reqHandle);
            }
            break;
        case "patch":
            {
                app.patch(endpoint.dir, reqHandle);
            }
            break;
        case "put":
            {
                app.patch(endpoint.dir, reqHandle);
            }
            break;
    }
});
app.get("*", (req, res) => {
    res.status(404).send("Error");
});
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
