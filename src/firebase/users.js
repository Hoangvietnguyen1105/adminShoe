const database = require('./db.js');

let addUser = async (data) => {
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
        console.log('Thêm user mới thành công');
      })
      .catch((error) => {
        console.error('Thêm user mới thất bại', error);
      });
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
      console.log(users)
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
  
module.exports={
    addUser,
    getAll,
    deleteUser,
    findByPhoneNumber,
    findById
}
