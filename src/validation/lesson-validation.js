import joi from "joi";

export const createSchema = joi.object({
  name: joi.string().required().max(50),
  questions: joi
    .array()
    .required()
    .items(
      joi.object({
        question: joi.string().required(),
        choice: joi.object({
          a: joi.string().required(),
          b: joi.string().required(),
          c: joi.string().required(),
          d: joi.string().required(),
        }),
        answer: joi.string().required(),
      })
    ),
});

export const idSchema = joi.number().positive().required();
export const exameSchema = joi.boolean().required();
export const requestSubmitSchema = joi.object().required();
