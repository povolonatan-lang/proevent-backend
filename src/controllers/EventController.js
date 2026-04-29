import EventService from '../services/EventService.js';

class EventController {
    async getAllEvents(req, res, next) {
        try {
            const { category, organizer } = req.query;
            const filters = {};
            if (category) filters.category = category;
            if (organizer) filters.organizer = organizer;

            const events = await EventService.getAllEvents(filters);
            res.json(events);
        } catch (error) {
            next(error);
        }
    }

    async getEventById(req, res, next) {
        try {
            const event = await EventService.getEventById(req.params.id);
            res.json(event);
        } catch (error) {
            next(error);
        }
    }

    async createEvent(req, res, next) {
        try {
            const eventData = { ...req.body, organizer: req.user._id };
            const event = await EventService.createEvent(eventData);
            res.status(201).json(event);
        } catch (error) {
            next(error);
        }
    }

    async updateEvent(req, res, next) {
        try {
            const event = await EventService.updateEvent(req.params.id, req.body, req.user._id.toString());
            res.json(event);
        } catch (error) {
            next(error);
        }
    }

    async deleteEvent(req, res, next) {
        try {
            await EventService.deleteEvent(req.params.id, req.user._id.toString());
            res.json({ message: 'Event removed' });
        } catch (error) {
            next(error);
        }
    }
}

export default new EventController();
