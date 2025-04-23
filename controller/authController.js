const UserDto = require('../dto/userDto');

class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    async signup(req, res) {
        try {
            const result = await this.authService.signup(req);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error in signup:', error);
            res.status(400).json({
                status: "error",
                message: error.message || 'Error creating user'
            });
        }
    }

    async login(req, res) {
        try {
            const result = await this.authService.login(req);
            res.json(result);
        } catch (error) {
            console.error('Error in login:', error);
            res.status(400).json({
                status: "error",
                message: error.message || 'Error logging in'
            });
        }
    }

    async logout(req, res) {
        try {
            const result = await this.authService.logout(req);
            res.json(result);
        } catch (error) {
            console.error('Error in logout:', error);
            res.status(500).json({
                status: "error",
                message: 'Error logging out'
            });
        }
    }

    async logoutAll(req, res) {
        try {
            const result = await this.authService.logoutAll(req);
            res.json(result);
        } catch (error) {
            console.error('Error in logoutAll:', error);
            res.status(500).json({
                status: "error",
                message: 'Error logging out from all devices'
            });
        }
    }
}

module.exports = AuthController;