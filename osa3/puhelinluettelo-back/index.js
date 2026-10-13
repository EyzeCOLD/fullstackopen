import express from "express";
import morgan from "morgan";
import "dotenv/config";
import { Person } from "./models/person.js";
const app = express();

app.use(express.json());
app.use(express.static("dist"));

morgan.token("reqdata", function (req, _) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :reqdata",
  ),
);

app.get("/api/people", async (_, response) => {
  const people = await Person.find({});

  response.json(people);
});

app.get("/api/people/:id", async (request, response) => {
  const id = request.params.id;

  try {
    const person = await Person.findById(id);

    if (person) response.send(person);
  } catch (error) {
    console.error("get by id error:", error);
    response.status(404).end();
  }
});

app.delete("/api/people/:id", async (request, response) => {
  const id = request.params.id;

  try {
    await Person.findByIdAndDelete(id);
  } catch (error) {
    console.error("delete error:", error);
  }
  response.status(204).end();
});

app.post("/api/people", async (request, response) => {
  const body = request.body;

  console.log(body);

  if (!body) {
    return response.status(404).json({ error: "Request body missing" });
  }
  if (!body.name) {
    return response.status(404).json({ error: "Name missing" });
  }
  if (!body.phoneNumber) {
    return response.status(404).json({ error: "Number missing" });
  }

  const found = await Person.find({ name: body.name });
  if (found.length > 0) {
    return response.status(409).json({ error: "Name must be unique" });
  }

  const person = new Person({
    name: body.name,
    phoneNumber: body.phoneNumber,
  });

  response.status(201).json(await person.save());
});

app.get("/info", (_, response) => {
  const infoPage = `<p>Phonebook has info for ${Person.length} people</p>
    <p>${new Date(Date.now()).toString()}</p>`;

  response.send(infoPage);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
