import express from 'express'

const app = express() 
const port = process.env.APP_PORT || 3000


app.get('/', (req, res) => {
 res.send('Buon lavoro!')
});

app.listen(port, () => 
 console.log(`Server started on http://localhost: ${port}`)
);