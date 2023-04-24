const database = require('./db.js');

let addUser = async (data) => {
    let user1 = await findByPhoneNumber(data.phoneNumber);
    let user2 = await findByEmail(data.email)
    
    if(user1===null &&user2 === null){
        const usersRef = database.ref('users');
    const newUserRef = usersRef.push();
  
    const newUser = {
      firstName: data.firstName,
      lastName:data.lastName,
      phoneNumber:data.phoneNumber,
      password:data.password,
      email:data.email,
      image:data.image,
      address:data.address,
      birth:data.birth,
      gender:data.gender,
      status:data.status
      
    };
  
    newUserRef.set(newUser)
      .then(() => {
        return Promise.resolve('Thêm user mới thành công');      })
      .catch((error) => {
        return Promise.reject('Thêm user mới thất bại', error);
      });
    }
    else{
        console.log(user1)
        console.log(user2)
        return"Trùng thông tin"
    }
    
}
let getAll = async () => {
    const usersRef = database.ref('users');
  
    try {
      const snapshot = await usersRef.once('value');
      const users = [];
  
      snapshot.forEach(childSnapshot => {
        const user = {
          id: childSnapshot.key,
          ...childSnapshot.val()
        };
        users.push(user);
      });
      return users;
    } catch (error) {
      console.error('Lấy danh sách user thất bại', error);
      throw error;
    }
  }
  let deleteUser = async (id) => {
    const usersRef = database.ref('users');
  
    try {
      await usersRef.child(id).remove();
      console.log(`Xóa user có id=${id} thành công`);
    } catch (error) {
      console.error(`Xóa user có id=${id} thất bại`, error);
      throw error;
    }
  }
  let findByPhoneNumber = async (phoneNumber) => {
    const usersRef = database.ref('users');
    const query = usersRef.orderByChild('phoneNumber').equalTo(phoneNumber);
  
    try {
      const snapshot = await query.once('value');
      const users = [];
  
      snapshot.forEach(childSnapshot => {
        const user = {
          id: childSnapshot.key,
          ...childSnapshot.val()
        };
        users.push(user);
      });
  
      if (users.length > 0) {
        return users[0];
      } else {
        console.log(`Không tìm thấy user có số điện thoại=${phoneNumber}`);
        return null;
      }
    } catch (error) {
      console.error(`Tìm kiếm user theo số điện thoại=${phoneNumber} thất bại`, error);
      throw error;
    }
  }
  let findById = async (id) => {
    const usersRef = database.ref('users');
    const query = usersRef.child(id);
  
    try {
      const snapshot = await query.once('value');
      const user = snapshot.val();
  
      if (user !== null) {
        return {
          id: snapshot.key,
          ...user
        };
      } else {
        console.log(`Không tìm thấy user có id=${id}`);
        return null;
      }
    } catch (error) {
      console.error(`Tìm kiếm user theo id=${id} thất bại`, error);
      throw error;
    }
  }
  
  let updateUser = async (data) => {
    let id = data.id
    const usersRef = database.ref('users');
    const userRef = usersRef.child(id);
  
    try {
      const snapshot = await userRef.once('value');
      const user = snapshot.val();
  
      if (user !== null) {
        await userRef.update({
          firstName: data.firstName || user.firstName,
          lastName: data.lastName || user.lastName,
          phoneNumber: data.phoneNumber || user.phoneNumber,
          password: data.password || user.password,
          email: data.email || user.email,
          image: data.image || user.image,
          address: data.address || user.address,
          birth: data.birth || user.birth,
          gender: data.gender || user.gender,
          status: data.status || user.status,
        });
        console.log(`Cập nhật thông tin user có id=${id} thành công`);
      } else {
        console.log(`Không tìm thấy user có id=${id}`);
      }
    } catch (error) {
      console.error(`Cập nhật thông tin user có id=${id} thất bại`, error);
      throw error;
    }
  }
  let findByEmail = async (email) => {
    const usersRef = database.ref('users');
    const query = usersRef.orderByChild('email').equalTo(email);
  
    try {
      const snapshot = await query.once('value');
      const users = [];
  
      snapshot.forEach(childSnapshot => {
        const user = {
          id: childSnapshot.key,
          ...childSnapshot.val()
        };
        users.push(user);
      });
  
      if (users.length > 0) {
        return users[0];
      } else {
        console.log(`Không tìm thấy user email=${email}`);
        return null;
      }
    } catch (error) {
      console.error(`Tìm kiếm user theo email=${email} thất bại`, error);
      throw error;
    }
  }
  module.exports={
      addUser,
      getAll,
      deleteUser,
      findByPhoneNumber,
      findById,
      updateUser
  }
  