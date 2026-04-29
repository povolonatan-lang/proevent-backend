import express from 'express';
import EventController from '../controllers/EventController.js';
import { protect } from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validationMiddleware.js';
import { eventSchema } from '../utils/validations.js';

const router = express.Router();

router.get('/', EventController.getAllEvents);
router.get('/:id', EventController.getEventById);
router.post('/', protect, validate(eventSchema), EventController.createEvent);
router.put('/:id', protect, validate(eventSchema), EventController.updateEvent);
router.delete('/:id', protect, EventController.deleteEvent);

export default router;
