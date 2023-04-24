let findByemail = async (email) => {
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