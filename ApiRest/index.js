const app = require('./app');
const port = 3900

app.get('/', (req, res) => {
    res.send('hola');
})

app.listen(port, () => {
    console.log('server running!');
});



