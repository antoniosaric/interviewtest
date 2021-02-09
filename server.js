const express = require('express');
const connectDb = require('./config/db');
const cors = require('cors');
var bodyParser = require('body-parser')

const app = express();

// connect database
connectDb();

// init middleware
app.use(cors())
// init middleware
app.use(express.json({ extended: false }));

app.use('/api/invoices', require('./api/invoices'));
app.use('/api/migration', require('./api/migration'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))