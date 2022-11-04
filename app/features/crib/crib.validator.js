import Joi from "joi";

export const cribAddV = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
    location: Joi.string()
});

export const cribUpdateV = Joi.object({
    cribs_id: Joi.string(),
    name: Joi.string().required(),
    img: Joi.string().required(),
    location: Joi.string()
});

export const cribListV = Joi.object({
    page: Joi.string().allow(),
    perPage: Joi.string().allow(),
    sortField: Joi.string().allow(),
    sortBy: Joi.string().allow(),
    search: Joi.string().optional().allow('')
});