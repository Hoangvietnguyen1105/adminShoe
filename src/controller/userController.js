const userDb = require('../firebase/users.js')

let addUserController = async(req,res)=>{
   let data =await req.body;
   let msg  = await userDb.addUser(data);
   
   if(msg !=="Trùng thông tin"){
    res.redirect('/user/getAllUser');
   }
   else{
    res.render('formAddUser.ejs',{data:msg})
   }
   
}
let getAllUser = async(req,res)=>{
    let data = await userDb.getAll();
   res.render('adminUser.ejs',{data:data})
}
let formAddUser = (req,res)=>{
    res.render('formAddUser.ejs',{data:""})
}
let deleteUser = async(req,res)=>{
    let id = req.query.id
    await userDb.deleteUser(id)
    res.redirect('/user/getAllUser');

}
let findByPhoneNumber = async(req,res)=>{
    let query = req.query.phoneNumber

    let data = await userDb.findByPhoneNumber(query);
    console.log(data)
    let a = []
    a.push(data)
    res.render('adminUser.ejs',{data:a})

    
}
let updateUser = async(req,res)=>{
    let id = req.query.id
    console.log(id)
    let data = await userDb.findById(id);
    console.log(data)
    res.render('formUpdateUser.ejs',{data:data})
}
let cfUpdateUser = async(req,res)=>{
    let data = await req.body;
    await userDb.updateUser(data)
    res.redirect('/user/getAllUser');
}
module.exports={
    addUserController,
    getAllUser,
    formAddUser,
    deleteUser,
    findByPhoneNumber,
    updateUser,
    cfUpdateUser
}