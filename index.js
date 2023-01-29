const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const userCollection = client.db("payBillDB").collection("users");

    // Bill Paying Api
    app.post("/api/add-billing", async (req, res) => {
      const userBill = req.body;
      const bill = await billCollection.insertOne(userBill);
      res.send(bill);
    });

    // Billing list Api
    app.get("/api/billing-list", async (req, res) => {
      const query = {};
      const bills = await billCollection.find(query).toArray();
      res.send(bills);
    });

    // Delete Bill Api
    app.delete("/api/delete-billing/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await billCollection.deleteOne(query);
      res.send(result);
    });

    // Update Bill Api
    app.put("/api/update-billing/:id", async(req, res) => {
      const id = req.params.id;
      const query =
    });

    // Registration  Api
    app.post("/api/registration", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
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
