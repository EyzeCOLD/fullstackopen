import express from "express";
import morgan from "morgan";
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

let persons = [
  {
    id: "1",
    name: "Mikko",
    number: "0503214562",
  },
  {
    id: "2",
    name: "Augustus",
    number: "0457685319",
  },
  {
    id: "3",
    name: "Sari",
    number: "0407782940",
  },
];

app.get("/api/persons", (_, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.send(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  persons = persons.filter((p) => p.id != id);
  response.status(204).end();
});

const generateId = () => {
  let id;
  do {
    id = Math.floor(Math.random() * 214748368);
  } while (persons.find((p) => p.id === id));
  return id;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  console.log(body);

  if (!body) {
    return response.status(404).json({ error: "Request body missing" });
  }
  if (!body.name) {
    return response.status(404).json({ error: "Name missing" });
  }
  if (!body.number) {
    return response.status(404).json({ error: "Number missing" });
  }

  if (persons.find((p) => p.name === body.name)) {
    return response.status(409).json({ error: "Name must be unique" });
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);
  response.status(201).json(newPerson);
});

app.get("/info", (_, response) => {
  const infoPage = `<p>Phonebook has info for ${persons.length} persons</p>
    <p>${new Date(Date.now()).toString()}</p>`;

  response.send(infoPage);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
