import { celebrate } from "celebrate";
import Joi from "joi";

export const validateRequestAddTask = celebrate({
  body: Joi.object({
    type: Joi.string().max(25).required(),
    data: Joi.string().max(25).required(),
    purpose: Joi.string().max(100).required(),
  }),
});
