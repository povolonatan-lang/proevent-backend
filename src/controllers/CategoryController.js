import CategoryService from '../services/CategoryService.js';

const DEFAULT_CATEGORIES = [
    { name: 'UFC', description: 'Ultimate Fighting Championship events' },
    { name: 'F1', description: 'Formula 1 racing events' },
];

class CategoryController {
    async getAllCategories(req, res, next) {
        try {
            const categories = await CategoryService.getAllCategories();
            res.json(categories);
        } catch (error) {
            next(error);
        }
    }

    async getCategoryById(req, res, next) {
        try {
            const category = await CategoryService.getCategoryById(req.params.id);
            if (!category) return res.status(404).json({ message: 'Category not found' });
            res.json(category);
        } catch (error) {
            next(error);
        }
    }

    async createCategory(req, res, next) {
        try {
            const category = await CategoryService.createCategory(req.body);
            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    }

    async updateCategory(req, res, next) {
        try {
            const category = await CategoryService.updateCategory(req.params.id, req.body);
            if (!category) return res.status(404).json({ message: 'Category not found' });
            res.json(category);
        } catch (error) {
            next(error);
        }
    }

    async deleteCategory(req, res, next) {
        try {
            await CategoryService.deleteCategory(req.params.id);
            res.json({ message: 'Category removed' });
        } catch (error) {
            next(error);
        }
    }

    async seedCategories(req, res, next) {
        try {
            const existing = await CategoryService.getAllCategories();
            if (existing.length > 0) {
                return res.json({ message: 'Categories already seeded', count: existing.length, categories: existing });
            }
            const created = await CategoryService.seedDefaults(DEFAULT_CATEGORIES);
            res.status(201).json({ message: 'Categories seeded successfully', count: created.length, categories: created });
        } catch (error) {
            next(error);
        }
    }
}

export default new CategoryController();

