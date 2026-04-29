import User from '../models/User.js';

class UserRepository {
    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async findById(id) {
        return await User.findById(id);
    }

    async findByVerificationToken(token) {
        return await User.findOne({ verificationToken: token });
    }

    async create(userData) {
        return await User.create(userData);
    }

    async update(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { new: true });
    }
}

export default new UserRepository();
