const { fetchUserByEmail } = require('../../models/db/features/Search')

class UserRepository {
    async findByEmail(email) {
        return await fetchUserByEmail(email);
    }
}

module.exports = new UserRepository();

