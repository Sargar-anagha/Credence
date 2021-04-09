const express = require('express'); // nodejs framwork
const mongoose = require('mongoose'); //database connection
// const cors = require('cors');

const app = express();
app.use(express.json()); // Middleware to parse incoming data
// app.use(cors());
const DB_URL = 'mongodb+srv://Anagha:Anaghasargar@1998@cluster0.kindq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false, 
}).then(() => {
    console.log(`Hi, We have Succssfully connected to the database`);
}).catch(err => {
    console.log(err);
});

app.use('/',require('./routes/user'));
app.listen(5000,() => {
    console.log(`Listening on PORT : 5000`);
});