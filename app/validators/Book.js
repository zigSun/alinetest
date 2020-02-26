const Extension = require('joi-date-extensions');
const Joi = require('joi').extend(Extension);

const createBodySchema = Joi.object({
  title: Joi.string().required().min(1),
  description : Joi.string(),
  image: Joi.string(),
  author: Joi.string(),
  date : Joi.date()
});

const udpdateBodySchema = Joi.object({
  title: Joi.string().min(1),
  description : Joi.string().allow(''),
  image: Joi.string().allow(''),
  author: Joi.string().allow(''),
  date : Joi.date()
});

const getListQuerySchema = Joi.object({
  id : Joi.number().integer().min(1),
  title: Joi.string(),
  description : Joi.string(),
  image: Joi.string(),
  author: Joi.string(),
  date : Joi.date(),
  limit : Joi.number().integer().min(0).default(20),
  offset: Joi.number().integer().min(0).default(0),
  order : Joi.string()
})

const idParamsSchema = Joi.object({
  id : Joi.number().integer().min(1)
})


module.exports = { createBodySchema, udpdateBodySchema, getListQuerySchema,idParamsSchema };