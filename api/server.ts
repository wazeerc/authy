import express, { RequestHandler } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const users: Record<string, string> = {};

const app = express();
// CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only frontend to access the API, change to frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  }),
);
app.use(bodyParser.json());

// Create root user
(() => {
  users["root"] = "admins";
  console.log("Root user created with password 'admins'");
})();

//#region: Auth middleware
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
//#endregion

//#region: API routes
app.get("/", (_, res) => {
  res.send("Welcome to Authy API!");
});
app.post("/register", register);
app.post("/login", login);

app.listen(5000, () => {
  console.log(`API running at http://localhost:5000`);
});
//#endregion
