import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5500;




app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})