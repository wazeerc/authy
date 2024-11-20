import express, { RequestHandler } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config();
const PORT = process.env.API_PORT;

// Add CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only frontend to access the API, change to frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  }),
);

app.use(bodyParser.json());

const users: Record<string, string> = {};

(() => {
  users["root"] = "admins";
  console.log("Root user created with password 'admins'");
})();

const register: RequestHandler = (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
  users[username] = password;
  res.status(201).json({ message: "User registered successfully" });
};

const login: RequestHandler = (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    const token = Buffer.from(`${username}:${password}`).toString("base64");
    res.status(200).json({ token });
    return;
  }
  res.status(401).json({ message: "Invalid credentials" });
};

app.get("/", (_, res) => {
  res.send("Welcome to Authy API!");
});

app.post("/register", register);
app.post("/login", login);

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
