import joi from "joi";

export const createSchema = joi.object({
  name: joi.string().required().max(50),
  questions: joi
    .array()
    .required()
    .items(
      joi.object({
        question: joi.string().required(),
        choice: joi // TODO fix choice validation not work
          .object({
            a: joi.any().required(),
            b: joi.any().required(),
            c: joi.any().required(),
            d: joi.any().required(),
          })
          .required(),
        answer: joi.string().required(),
      })
    ),
});

export const idSchema = joi.number().positive().required();
export const exameSchema = joi.boolean().required();
export const requestSubmitSchema = joi.object().required();
