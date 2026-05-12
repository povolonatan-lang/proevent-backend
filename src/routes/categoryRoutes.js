import express from 'express';
import CategoryController from '../controllers/CategoryController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validationMiddleware.js';
import { categorySchema } from '../utils/validations.js';

const router = express.Router();

router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.post('/seed', protect, admin, CategoryController.seedCategories);
router.post('/', protect, admin, validate(categorySchema), CategoryController.createCategory);
router.put('/:id', protect, admin, validate(categorySchema), CategoryController.updateCategory);
router.delete('/:id', protect, admin, CategoryController.deleteCategory);

export default router;

