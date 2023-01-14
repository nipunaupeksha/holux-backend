const express = require("express");
const bodyParser = require("body-parser");
const cors =  require("cors");

const users = require("./server/routes/user-routes");
const orders = require("./server/routes/order-routes");
const outlets = require("./server/routes/outlet-router");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    origin:"http://localhost:4200"
}));

app.use("/users", users);
app.use("/orders", orders);
app.use("/outlets", outlets);

app.listen(port, ()=>{
    console.log(`Holux backend is listening at http://localhost:${port}`);
});
