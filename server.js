const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

// Student data
let students = [
    { id: 1, name: "Rahul", course: "BCA" },
    { id: 2, name: "Priya", course: "B.Tech" }
];

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to IBM Cloud REST API"
    });
});

// GET all students
app.get("/students", (req, res) => {
    res.json(students);
});

// GET student by ID
app.get("/students/:id", (req, res) => {
    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

// POST - Add student
app.post("/students", (req, res) => {
    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({
            message: "Name and course are required"
        });
    }

    const newStudent = {
        id: students.length
            ? Math.max(...students.map(s => s.id)) + 1
            : 1,
        name,
        course
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// PUT - Update student
app.put("/students/:id", (req, res) => {
    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({
            message: "Name and course are required"
        });
    }

    student.name = name;
    student.course = course;

    res.json({
        message: "Student updated successfully",
        student
    });
});

// DELETE - Delete student
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const studentExists = students.some(s => s.id === id);

    if (!studentExists) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students = students.filter(s => s.id !== id);

    res.json({
        message: "Student deleted successfully"
    });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
