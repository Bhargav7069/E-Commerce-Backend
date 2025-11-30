import app from './app';
import dotenv from 'dotenv';
import { connectDB } from './config/mongodb';

dotenv.config();

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});