import express, { Request, Response } from "express";
import fs from "fs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = express();
const port = 3000;

interface Endpoint extends JSON {
  random?: false;
  dir: string;
  expected: JSON;
  type: string;
}

const data = fs.readFileSync("./endpoints.json").toString();
const parsedData: [Endpoint] = JSON.parse(data);
const mappedData = Object.entries(parsedData);
const endpoints: Endpoint[] = mappedData.map((i) => i[1]);

endpoints.map((e) => console.log(e));

app.use(express.json());
endpoints.map((endpoint) => {
  const reqHandle = (req: Request, res: Response) => {
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

app.get("*", (req: Request, res: Response) => {
  res.status(404).send("Error");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
