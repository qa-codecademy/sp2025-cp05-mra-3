import express from 'express';
import path from 'path';    
import dotenv from 'dotenv';

dotenv.config();  
const app = express();
const __dirname = path.resolve();


app.use(express.static(path.join(__dirname, 'sp2025-cp05-mra-3')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'HTML', 'adminDashboard.html'));
});

app.get('/test', (req, res) => {

    res.send('Test function executed.'); 
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

function test(){
   
} 

