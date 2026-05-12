import Category from '../models/Category.js';

class CategoryRepository {
    async findAll() {
        return await Category.find().lean();
    }

    async findById(id) {
        return await Category.findById(id).lean();
    }

    async create(categoryData) {
        return await Category.create(categoryData);
    }

    async insertMany(categories) {
        return await Category.insertMany(categories);
    }

    async update(id, categoryData) {
        return await Category.findByIdAndUpdate(id, categoryData, { new: true });
    }

    async delete(id) {
        return await Category.findByIdAndDelete(id);
    }
}

export default new CategoryRepository();

