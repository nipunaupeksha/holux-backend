const express = require("express");
const bodyParser = require("body-parser");
const cors =  require("cors");

const users = require("./server/routes/user-routes");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    origin:"http://localhost:5000"
}));

app.use("/users", users);

app.listen(port, ()=>{
    console.log(`Holux backend is listening at http://localhost:${port}`);
});
