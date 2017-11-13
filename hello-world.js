const MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

// connectin url
const url = 'mongodb://localhost:27017/fantastic';

// use connect method to connect to the server
MongoClient.connect(url, (err, db) => {
  assert.equal(null, err);
  console.log('Connected successfully to the server');

  insertDocuments(db, () => { findDocuments(db, () => {
     db.close();
   });
  });
});

const insertDocuments = (db, callback) => {
  console.log('start insert')
  // get the documents collection
  const collection = db.collection('documents');
  // insert some documents
  collection.insertMany([
    {a: 1}, {a: 2}, {a: 3},
], (err, result) => {
  assert.equal(err, null);
  assert.equal(3, result.result.n);
  assert.equal(3, result.ops.length);
  console.log('Inserted 3 documents into the collection');
  callback(result);
  });
}

const findDocuments = (db, callback) => {
  // get the documents collection
  const collection = db.collection('documents');
  // find some documents
  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    console.log('Found the following records');
    console.log(docs);
    callback(docs);
  });
}

const updateDocument = (db, callback) => {
  // get the documents collection
  const collection = db.collection('documents');
  // update document where a is 2, set b equal to 1
  collection.updateOne({ a: 2 }, { $set: { b: 1} }, (err, result) => {
    assert.equal(err, null);
    asserrt.equal(1, result.result.n);
    console.log('Updated the document with the field a equal to 2');
    callback(result);
  });
}
