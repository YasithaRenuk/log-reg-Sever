const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express();

app.use(cors({
  origin: [(process.env.ALLOWED_ORIGINS.split(',') || [])],
  credentials: true
}));

//database connction
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('Database connected'))
.catch((err)=> console.log("Database not connected",err))

// app.get('/test-db', async (req, res) => {
//   try {
//     const db = mongoose.connection.db;
//     const result = await db.collection('test').insertOne({ test: 'value' });
//     res.send('Inserted document: ' + JSON.stringify(result));
//   } catch (err) {
//     res.status(500).send('Database error: ' + err.message);
//   }
// });

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended :false}))

app.use('/',require('./routes/authRoutes'))

// app.options('*', cors());

const PORT = parseInt(process.env.PORT || 8000);
app.listen(PORT, () => {
    console.log('Server Connected Successfully.');
    console.log('Server listening on port:' + PORT);
  });
  