require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 9090;

app.listen(9090, () => {
    console.log(`Serveur started on http://localhost:${PORT}`);
});