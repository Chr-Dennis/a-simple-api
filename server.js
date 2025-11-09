import express from "express";

const app = express();
const port = 2025;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));




app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("Press Ctrl+C to end this process.");
});






