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

app.get("/api/persons", async (_, response) => {
  const persons = await Person.find({});

  response.json(persons);
});

app.get("/api/persons/:id", async (request, response, next) => {
  const id = request.params.id;

  try {
    const person = await Person.findById(id);

    if (person) response.send(person);
    else response.status(404).end();
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:id", async (request, response, next) => {
  const id = request.params.id;

  try {
    await Person.findByIdAndDelete(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.post("/api/persons", async (request, response, next) => {
  const body = request.body;

  if (!body) {
    return response.status(400).json({ error: "Request body missing" });
  }
  if (!body.name) {
    return response.status(400).json({ error: "Name missing" });
  }
  if (!body.phoneNumber) {
    return response.status(400).json({ error: "Number missing" });
  }

  const found = await Person.find({ name: body.name });
  if (found.length > 0) {
    return response.status(409).json({ error: "Name must be unique" });
  }

  const person = new Person({
    name: body.name,
    phoneNumber: body.phoneNumber,
  });

  try {
    const added = await person.save();
    response.status(201).json(added);
  } catch (error) {
    next(error);
  }
});

app.get("/info", (_, response) => {
  const infoPage = `<p>Phonebook has info for ${Person.length} persons</p>
    <p>${new Date(Date.now()).toString()}</p>`;

  response.send(infoPage);
});

app.put("/api/persons/:id", async (request, response, next) => {
  const { name, phoneNumber } = request.body;

  try {
    const person = await Person.findById(request.params.id);
    if (!person) return response.status(404).end();

    person.name = name;
    person.phoneNumber = phoneNumber;

    const updated = await person.save();
    response.json(updated);
  } catch (error) {
    next(error);
  }
});

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, _, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
