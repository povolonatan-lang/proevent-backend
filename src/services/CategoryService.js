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

    async seedDefaults(categories) {
        return await CategoryRepository.insertMany(categories);
    }

    async initialize() {
        const existing = await CategoryRepository.findAll();
        if (existing.length === 0) {
            const defaults = [
                { name: 'UFC', description: 'Ultimate Fighting Championship events' },
                { name: 'F1', description: 'Formula 1 racing events' }
            ];
            await CategoryRepository.insertMany(defaults);
            console.log('Database initialized with default categories.');
        }
    }
}

export default new CategoryService();

