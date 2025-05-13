const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    console.log('Signup data received:', { name, email, password }); // Gutuma amakuru agaragara neza muri console
    res.json({ message: "Signup is done successfully" });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Login data received:', { email, password }); // Gutuma amakuru agaragara neza muri console
    res.json({ message: "Welcome again" });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
