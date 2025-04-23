const User = require('../../models/userModel');

class UserDao {
    async createUser(userData) {
        try {
            const user = new User(userData);
            await user.save();
            return user;
        } catch (error) {
            console.error('Error in createUser DAO:', error);
            throw error;
        }
    }

    async findByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            console.error('Error in findByEmail DAO:', error);
            throw error;
        }
    }

    async findById(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            console.error('Error in findById DAO:', error);
            throw error;
        }
    }

    async findByToken(id, token) {
        try {
            return await User.findOne({ _id: id, 'tokens.token': token });
        } catch (error) {
            console.error('Error in findByToken DAO:', error);
            throw error;
        }
    }

    async updateUser(id, updateData) {
        try {
            return await User.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
            console.error('Error in updateUser DAO:', error);
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            return await User.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error in deleteUser DAO:', error);
            throw error;
        }
    }
}

module.exports = UserDao;
  