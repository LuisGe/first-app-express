const express = require('express')
var cors = require('cors')

const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express()
app.use(cors()); //All cors alowed
// const whitelist = ['http://localhost:8080', 'https://myapp.co'];
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('no permitido'));
//     }
//   }
// }
// app.use(cors(options)); //CORS with a white list

const port = process.env.PORT || 3000

app.use(express.json())
app.get('/api', (req, res) => {
  res.send('Mi primer server en express')
})
routerApi(app);
//Errors Middlewar's
app.use(logErrors)
app.use(boomErrorHandler);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
