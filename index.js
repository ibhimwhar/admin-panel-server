import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

let User = [
    {
        id: 23456,
        name: "name",
        gender: "male",
        age: 15
    },
];

// Get all users
app.get("/user", (req, res) => {
    res.status(200).json(User);
});

// Add user
app.post("/user", (req, res) => {
    const { id, name, gender, age } = req.body;

    if (!name || !gender || !age) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const NewList = {
        id: id || Math.floor(Math.random() * 100000),
        name,
        gender,
        age
    };

    User.push(NewList);
    res.status(201).json({ success: true, user: NewList });
});

// Delete user
app.delete("/user/:id", (req, res) => {
    const { id } = req.params;

    User = User.filter(item => item.id !== Number(id));

    console.log("Deleted user with id:", id);
    res.json({ success: true });
});

// Edit user
app.put("/user/:id", (req, res) => {
    const { id } = req.params;
    const { name, gender, age } = req.body;

    User = User.map((item) =>
        item.id === Number(id)
            ? { ...item, name, gender, age }
            : item
    );

    res.json({ success: true, updatedUser: { id: Number(id), name, gender, age } });
});


app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
