const readline = require('readline');
const admin = require("firebase-admin");

const args = process.argv.slice(2);
const serviceAccount = require(args[0]);
const dbName = args[1];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${dbName}.firebaseio.com/`
});
const db = admin.database();
console.log(`Connected to ${dbName}!`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Firebase path? ', (path) => {
  console.log(`Attaching 'child_added' listener to ${path}...`);
  db.ref(path).orderByKey().limitToLast(2).on("child_added", function(snapshot) {
    console.log(`${path}: child_added`, snapshot.val());
  });
});
