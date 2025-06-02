const pool = require('../utils/connectDB');

const getAll = async () => {
    try {
      const [rows] = await pool.execute('SELECT * FROM users');
      return rows;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw new Error('Failed to fetch users');
    }
  };

const createUser = async (newUser) => {
    const { fullname, email, password, phoneNumber, address, role } = newUser;
    const query = 'INSERT INTO users(`fullname`,`email`,`password`,`phoneNumber`,`address`,`role`) VALUES(?,?,?,?,?,?)';
    const [rows] = await pool.execute(query, [fullname, email, password, phoneNumber, address, role]);
    return rows;
}

const getUserById = async (id) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

const getUserByFullName = async (fullname) => {
  try {
      const [rows] = await pool.execute('SELECT * FROM users WHERE fullname = ?', [fullname]);
      return rows.length > 0 ? rows[0] : null;
  } catch (error) {
      console.error('Error fetching user by fullname:', error);
      throw new Error('Failed to fetch user by fullname');
  }
};

const updateUser = async (id, updateUser) => {
    const { fullname, email, password, phoneNumber, address, role } = updateUser;
    const query = 'UPDATE `users` SET `fullname`=?,`email`=?,`password`=?,`phoneNumber`=?,`address`=?,`role`=? WHERE `id`=?';
    const [rows] = await pool.execute(query, [fullname, email, password, phoneNumber, address, role, id]);
    return rows;
}

const deleteUser = async (id) => {
    const [rows] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    return rows;
}

module.exports = {
    getAll, createUser, updateUser, getUserById, deleteUser,getUserByFullName
}