import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { hashPassword } from "../src/lib/utils";
import { db, initDB } from "../src/db/db";

const app = express();
// CORS middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  }),
);
app.use(bodyParser.json());

//#region: Auth middleware
const register = async (req, res) => {
  const { username, password } = req.body;

  await db.read();
  const existingUser = db.data?.users.find(user => user.username === username);

  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = hashPassword(password);
  db.data?.users.push({ username, hashedPassword });
  await db.write();

  res.status(201).json({ message: "User registered successfully" });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  await db.read();
  const user = db.data?.users.find(user => user.username === username);

  if (!user || user.hashedPassword !== hashPassword(password))
    return res.status(400).json({ message: "Invalid username or password" });

  res.status(200).json({ message: "Login successful" });
};
//#endregion

//#region: API routes
app.get("/", (_, res) => {
  res.send("Welcome to Authy API!");
});
app.post("/register", register);
app.post("/login", login);

app.listen(5000, async () => {
  await initDB();

  await db.read();
  const rootUser = db.data?.users.find(user => user.username === "root");
  if (!rootUser) {
    db.data?.users.push({
      username: "root",
      hashedPassword: hashPassword("admin1"),
    });
    await db.write();
    console.log("Root user created with password `admin1`");
  }

  console.log(`API running at http://localhost:5000`);
});
//#endregion
