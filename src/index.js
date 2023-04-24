const express = require('express');
const app = express();
const port = 3020;

const initWebRoutes = require( './router/web.js');
const viewEngine = require('./config/viewEngine.js')
const bodyParser = require('body-parser')


// Khai báo middleware của Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Khai báo các định nghĩa tuyến đường của Express
app.get('/', (req, res) => {
  res.send('Hello World!');
});
//firebase
// addUser();
initWebRoutes(app);
viewEngine.configViewEngine(app)

// Khởi động ứng dụng trên cổng 3000
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
