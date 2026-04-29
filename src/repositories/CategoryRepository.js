import Category from '../models/Category.js';

class CategoryRepository {
    async findAll() {
        return await Category.find();
    }

    async findById(id) {
        return await Category.findById(id);
    }

    async create(categoryData) {
        return await Category.create(categoryData);
    }

    async update(id, categoryData) {
        return await Category.findByIdAndUpdate(id, categoryData, { new: true });
    }

    async delete(id) {
        return await Category.findByIdAndDelete(id);
    }
}

export default new CategoryRepository();
