const express  = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/connextDB');
const path = require("path");


dotenv.config();

connectDB();


const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// app.get('/', (req,res)=>{
//     res.send("<h1>hello from server</h1>")
// });
app.use('/api/v1/users', require("./routes/userRoute"));
app.use('/api/v1/transections', require("./routes/transectionRoute"));

app.use(express.static(path.join(__dirname, "./client/build")))
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

const PORT=8080 || process.env.PORT

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
});