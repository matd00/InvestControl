const bcrypt = require('bcrpt');
const UserRepository = require('./userRepository');

class UserService {
    async authenticate(email, password) {
        const user = await UserRepository.findByEmail(email);
        
        if (!user) return null;
            const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;
            return user;
        }
    }

module.exports = new UserService();
