import sqlite3 from "sqlite3";
import path from "path";
import { ROOT_DIR } from "../../settings";

const db = new sqlite3.Database(path.join(ROOT_DIR, "db.sqlite3"), (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log("Database is working");
        
        db.run(`
        CREATE TABLE repository (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            url text, 
            image_url text,
            description text, 
            language text,
            languages text,
            homepage text
        )`, (err) => {
            if (err) {
                console.log("Table Respository already exists")
            }
        })
    }
})

export default db