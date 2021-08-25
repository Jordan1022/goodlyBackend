var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://dbuser:1Joyann1!@cluster0.maqg7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try{
    await client.connect();

    const database =  client.db("Cluster0");
    const places = database.collections("sample_airbnb");

    const query = {"_id": "10006546"}; 

    const options = {
      "projection": {
        "listing_id": 1,
        "name": 1,
        "summary": 1,
      }
    };

    const place = await places.findOne(query, options);
    console.log(place);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
// MongoClient.connect(uri, function (err, client) {
//   if (err) throw err

//   var db = client.db('Cluster0')

//   db.collection('sample_airbnb'._id).find("10006546").toArray(function (err, result) {
//     if (err) throw err

//     console.log(result)
//   })
// })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
