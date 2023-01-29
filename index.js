const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect with mongoDB

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.dftbcru.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const billCollection = client.db("payBillDB").collection("bills");

    app.post("/api/add-billing", async (req, res) => {
      const userBill = req.body;
      console.log(userBill);
      // const bill = await billCollection.insertOne(userBill);
      // res.send(bill);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

//  Testing server code
app.get("/", (req, res) => {
  res.send("Simple PayBill server");
});

app.listen(port, () => {
  console.log("Simple PayBill server listening on port", port);
});
