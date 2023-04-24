const shoeDb = require('../firebase/shoes.js')
let addShoesController = async(req,res)=>{
   let data =await req.body;
   await shoeDb.addShoes(data);
}
let getAllshoes = async(req,res)=>{
    shoeDb.getAll();
}
module.exports={
    addShoesController,
    getAllshoes
}