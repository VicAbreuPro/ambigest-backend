db = db.getSiblingDB('ambigest');
db1 = db.getSiblingDB('testDB');

db.createUser({
    user: 'ambigestAdmin',
    pwd: 'ambigestAdmin',
    roles: [
      { role: 'dbOwner', db: 'ambigest' }
    ]
});

db1.createUser({
    user: 'ambigestTestAdmin',
    pwd: 'ambigestTestAdmin',
    roles: [
      { role: 'dbOwner', db: 'testDB' }
    ]
});

const userConlection = "user_entity";
const wasteCollectionCollection = "waste_collection_entity";

db1[userConlection].insertOne({
  username: 'victor.abreu09',
  email: 'victor.abreu09@gmail.com',
  firebase_id: 'GLSajKFIteV8O68PsCI8mqSbD2n1'
})

const user = db1[userConlection].findOne({ firebase_id: 'GLSajKFIteV8O68PsCI8mqSbD2n1'});

db1[wasteCollectionCollection].insertMany([
  {
    userId: user._id.toString(),
    type: 'recolha de resíduos de vidro',
    latitude: '41.527953219586394',
    longitude: '-8.6296646711644',
    pickup_at :'2023-02-26',
    time_of_day: 'tarde'
  },
  {
    userId: user._id.toString(),
    type: 'recolha de resíduos de metal',
    latitude: '41.527953219586394',
    longitude: '-8.6296646711644',
    pickup_at :'2023-02-25',
    time_of_day: 'tarde'
  },
  {
    userId: user._id.toString(),
    type: 'recolha de resíduos de organicos',
    latitude: '41.527953219586394',
    longitude: '-8.6296646711644',
    pickup_at :'2023-02-27',
    time_of_day: 'tarde'
  }
])