const express = require("express")
const mongoose = require("mongoose")
const { UserModel } = require("./models/user")
const app = express();
const dashRouter = require("./routes/dashboard");
const router = require("./routes/users");
const productrouter = require("./routes/products");
const orderRouter = require("./routes/order");
var cors = require('cors');
const path = require("path");
require("dotenv").config();

const bodyParser = require("body-parser");
router.use(bodyParser.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var whitelist = ["http://localhost:5173", "https://estore-express.netlify.app"];
var corsOptions = { origin: whitelist, credentials: true };
app.use(cors(corsOptions));

mongoose.connect(process.env.mongoURL)
    .then(() => console.log('Connected!'));

app.use(express.json());




app.use("api/user", router)
app.use("api/products", productrouter)
app.use("api/order", orderRouter)
app.use("api/dashboard", dashRouter)
app.get("/", (req, res) => {
    return res.json("hello world")
});

// app.use(express.static(path.join(__dirname, './frontend/dist')));
// app.get('*', function (_, res) {
//     res.sendFile(path.join(__dirname, "./frontend/dist/index.html"), function (err) {
//         res.status(500).send(err, 'error hay bro')
//     })
// })
// app.get('/', (req, res) => {
//     app.use(express.static(path.resolve(__dirname, "frontend", "dist")));

//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
// })
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("server is running"))
