const { db} = require('./db.js');

let addShoes = async (data) => {
    try {
      const docRef = await db.collection('shoes').add({
        
        name: data.name,
        price:data.price,
        image:data.image,
        brand:data.brandId,
        discountPrice:data.discountPrice,
        soldNumber:data.soldNumber,
        avarageRate:data.avarageRate,
        status:data.status,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }
  let getAll = async () => {
    try {
      const snapshot = await db.collection('shoes').get();
      const data = [];
      snapshot.forEach(doc => {
        const obj = doc.data();
        obj.id = doc.id;
        data.push(obj);
      });
      console.log(data) ;
    } catch (error) {
      console.error('Error getting documents: ', error);
      return [];
    }
  }
  
module.exports={
    addShoes,
    getAll
}
