import CategoryRepository from '../repositories/CategoryRepository.js';

class CategoryService {
    async getAllCategories() {
        return await CategoryRepository.findAll();
    }

    async getCategoryById(id) {
        return await CategoryRepository.findById(id);
    }

    async createCategory(categoryData) {
        return await CategoryRepository.create(categoryData);
    }

    async updateCategory(id, categoryData) {
        return await CategoryRepository.update(id, categoryData);
    }

    async deleteCategory(id) {
        return await CategoryRepository.delete(id);
    }
}

export default new CategoryService();
