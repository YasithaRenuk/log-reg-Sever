const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

//database connction
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('Database connected'))
.catch((err)=> console.log("Database not connected",err))

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended :false}))

app.use('/',require('./routes/authRoutes'))

app.options('*', cors());

const PORT = 8000;
app.listen(PORT, () => {
    console.log('Server Connected Successfully.');
    console.log('Server listening on port:' + PORT);
  });
  