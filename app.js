import express from 'express'
import router from './Routes/productsRouter.js'

const app = express() 
const port = process.env.APP_PORT || 3000

app.use(express.json())


app.get('/', (req, res) => {
 res.send('Buon lavoro!')
});

app.listen(port, () => 
 console.log(`Server started on http://localhost: ${port}`)
);