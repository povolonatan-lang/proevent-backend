import Event from '../models/Event.js';

class EventRepository {
    async findAll(query = {}) {
        return await Event.find(query).populate('category').populate('organizer', 'name email').lean();
    }

    async findById(id) {
        return await Event.findById(id).populate('category').populate('organizer', 'name email').lean();
    }

    async create(eventData) {
        return await Event.create(eventData);
    }

    async update(id, eventData) {
        return await Event.findByIdAndUpdate(id, eventData, { new: true }).populate('category').populate('organizer', 'name email');
    }

    async delete(id) {
        return await Event.findByIdAndDelete(id);
    }
}

export default new EventRepository();
