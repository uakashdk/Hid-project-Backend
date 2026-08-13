const express = require('express');
const cors = require('cors');
require('dotenv').config();
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const port = process.env.PORT || 5555;

app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
