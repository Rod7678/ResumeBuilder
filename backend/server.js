const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors({
    origin: 'http://localhost:5173'
}))

app.get('/', (req, res)=>{
    res.send({'hello':'hello world'});
})

app.listen(3000, ()=>{
    console.log('Backend listning on localhost:3000')
})