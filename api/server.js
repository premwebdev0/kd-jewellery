// version 1.10

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('KD Jewellery API is running!');
});

let products = [
    { id: 1, name: "Gold Necklace", price: 25000 },
    { id: 2, name: "Silver Ring", price: 1500 }
];

app.get('/products', (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server chal raha hai: http://localhost:${PORT}`);
});