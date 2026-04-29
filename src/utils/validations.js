import Joi from 'joi';

export const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const categorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow('')
});

export const eventSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
    location: Joi.string().required(),
    category: Joi.string().required(), // Category ID
    imageUrl: Joi.string().uri().allow('')
});
