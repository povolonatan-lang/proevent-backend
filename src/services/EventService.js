import EventRepository from '../repositories/EventRepository.js';

class EventService {
    async getAllEvents(filters) {
        return await EventRepository.findAll(filters);
    }

    async getEventById(id) {
        const event = await EventRepository.findById(id);
        if (!event) throw new Error('Event not found');
        return event;
    }

    async createEvent(eventData) {
        return await EventRepository.create(eventData);
    }

    async updateEvent(id, eventData, userId) {
        const event = await EventRepository.findById(id);
        if (!event) throw new Error('Event not found');
        
        // Only organizer can update
        if (event.organizer._id.toString() !== userId) {
            throw new Error('Not authorized to update this event');
        }

        return await EventRepository.update(id, eventData);
    }

    async deleteEvent(id, userId) {
        const event = await EventRepository.findById(id);
        if (!event) throw new Error('Event not found');

        // Only organizer can delete
        if (event.organizer._id.toString() !== userId) {
            throw new Error('Not authorized to delete this event');
        }

        return await EventRepository.delete(id);
    }
}

export default new EventService();
