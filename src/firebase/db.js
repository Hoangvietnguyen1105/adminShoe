const admin = require('firebase-admin');

// Khởi tạo SDK bằng tệp tin serviceAccountKey.json
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:'https://mad-d19-n5-default-rtdb.firebaseio.com/'
});

const database = admin.database();

module.exports = database


