class UserDto {
    static toResponse(user) {
        if (!user) return {};
        
        return {
            id: user._id || user.id,
            name: user.name || '',
            email: user.email || '',
            institution: user.institution || '',
            //createdAt: user.createdAt || new Date().toISOString()
        };
    }

    static toAuthResponse(user, token, operation) {
        if (!user) {
            return {
                status: "error",
                message: 'User data not found'
            };
        }

        const messages = {
            signup: 'Signed up successfully',
            login: 'Login successful'
        };

        return {
            status: "success",
            data: {
                user: this.toResponse(user),
                token: token
            },
            message: messages[operation] || 'Authentication successful'
        };
    }
}

module.exports = UserDto;