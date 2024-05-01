import express, { NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AccountRouter from './routes/account';
import cookieSession from 'cookie-session';
import requireAuth from './middlewares/require-auth';
import MediaRouter from './routes/mediaRouter';

// read environment variables from .env file
dotenv.config();
//setting port
const PORT = process.env.PORT ?? 8000;
//setting URI
const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://eliprem:ldZAwQCpS86jviXI@cluster0.yqpgiwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URI, {});
//console statements for testing connection:
//const db = mongoose.connection;
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//db.once('open', () => console.log('Connected to MongoDB'));


const app = express();
app.use(express.json());

app.use(
  cookieSession({
    secret: 'DontTellAnyone',
    keys: ['random-secret'],
    maxAge: 24 * 60 * 80 * 1000,
  }),
);

app.use((req, _res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.session);
  next();
});



// define root route
app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello, frontend!' });
});

app.use('/api/account', AccountRouter);
app.use('/api/media/add', requireAuth);
app.use('/api/media/bycreator', requireAuth);
app.use('/api/media', MediaRouter);


// Error handling middleware
app.use((err, _req, res, _next:NextFunction) => {
  res.status(500).json({ error: err.message });
});


// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});


//mongodb user eliprem, pass: ldZAwQCpS86jviXI