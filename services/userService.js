const UserDto = require('../dto/userDto');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { validatePasswordUpdate } = require('../validation/userValidator');

class UserService {
    constructor(userDao, mongoUserDao) {
        this.userDao = userDao;
        this.mongoUserDao = mongoUserDao;
    }

    async getUserProfile(req) {
        try {
            const user = await this.mongoUserDao.getUserProfile(req);
            return UserDto.toResponse(user);
        } catch (error) {
            throw error;
        }
    }

    async getAllUsers() {
        try {
            const users = await this.mongoUserDao.getAllUsers();
            return users.map(user => UserDto.toResponse(user));
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.mongoUserDao.getUserByEmail(email);
            if (user.status === "error") {
                throw new Error(user.message);
            }
            return UserDto.toResponse(user);
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id) {
        try {
            const user = await this.mongoUserDao.getUserById(id);
            if (user.status === "error") {
                throw new Error(user.message);
            }
            return UserDto.toResponse(user);
        } catch (error) {
            throw error;
        }
    }

    async updatePassword(id, newPassword) {
        try {
            const validationErrors = validatePasswordUpdate(newPassword);
            if (validationErrors) {
                throw new Error(JSON.stringify(validationErrors));
            }

            const hashedPassword = await hashPassword(newPassword);
            const result = await this.mongoUserDao.updatePasswordById(id, hashedPassword);
            if (result.status === "error") {
                throw new Error(result.message);
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const user = await this.mongoUserDao.deleteUserById(id);
            if (user.status === "error") {
                throw new Error(user.message);
            }
            return UserDto.toResponse(user);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService; 