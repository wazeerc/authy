import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

import path from "path";
import { fileURLToPath } from "url";

import { Credentials } from "@/types";

type Data = { users: Credentials[] };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const adapter = new JSONFile<Data>(path.join(__dirname, "db.json"));
const db = new Low<Data>(adapter, { users: [] });

const initDB = async () => {
  await db.read();
  db.data ||= { users: [] };
  await db.write();
};

export { db, initDB };
