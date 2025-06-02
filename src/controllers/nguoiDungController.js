const nguoiDungModel = require('../models/nguoiDungModel');
const bcrypt = require('bcrypt');

class nguoiDung {
    async getAllUser(req, res) {
        try {
            const nguoiDung = await nguoiDungModel.getAll();
            res.status(201).json(nguoiDung);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createUserController(req, res) {
        try {
            const newUser = req.body;
    
            // Kiểm tra xem fullname đã tồn tại chưa
            const existingUser = await nguoiDungModel.getUserByFullName(newUser.fullname);
            if (existingUser) {
                return res.status(400).json({ message: "fullname đã tồn tại" });
            }
    
            // Mã hóa mật khẩu
            newUser.password = await bcrypt.hash(newUser.password, 10);
    
            // Tạo người dùng mới
            await nguoiDungModel.createUser(newUser);
            res.status(201).json({ message: "Tạo người dùng thành công" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUserController(req, res) {
        try {
            const { id } = req.params;
            const updateUser = req.body;

            const user = await nguoiDungModel.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (updateUser.password) {
                updateUser.password = await bcrypt.hash(updateUser.password, 10);
            }
            await nguoiDungModel.updateUser(id, updateUser);
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUserController(req, res) {
        try {
            const { id } = req.params;
            const user = await nguoiDungModel.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            await nguoiDungModel.deleteUser(id);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async loginUserController(req, res) {
        try {
            const { fullName, password } = req.body;

            // Kiểm tra xem fullName và password có được gửi lên không
            if (!fullName || !password) {
                return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ tên đăng nhập và mật khẩu!" });
            }

            // Tìm người dùng theo fullName
            const user = await nguoiDungModel.getUserByFullName(fullName);
            if (!user) {
                return res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng!" });
            }

            // So sánh mật khẩu
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng!" });
            }

            // Trả về thông tin người dùng (không bao gồm password)
            const userResponse = {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                role: user.role || "Customer", // Mặc định role là Customer nếu không có
            };
            res.status(200).json(userResponse);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new nguoiDung();