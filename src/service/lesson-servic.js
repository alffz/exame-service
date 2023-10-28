import validate from "../validation/validaton.js";
import ResponseError from "../error/response-error.js";

import {
  createSchema,
  exameSchema,
  idSchema,
  requestSubmitSchema,
} from "../validation/lesson-validation.js";
import { prismaClient } from "../app/database.js";
import crypto from "crypto";

const create = async (request) => {
  request = validate(createSchema, request);

  const lesson = await prismaClient.lesson.count({
    where: {
      name: request.name,
    },
  });

  if (lesson === 1) {
    throw new ResponseError(409, ["lesson already exist"]);
  }

  request = {
    name: request.name,
    questions: request.questions.map((question) => {
      question.id = `id${crypto.randomBytes(5).toString("hex")}s`;
      return question;
    }),
  };

  return prismaClient.lesson.create({ data: request });
};

const update = async ({ id, request }) => {
  id = validate(idSchema, id);

  const lesson = await prismaClient.lesson.findFirst({
    where: {
      id: id,
    },
  });

  if (!lesson) {
    throw new ResponseError(404, ["lesson not found"]);
  }

  request = validate(createSchema, request);

  request = {
    name: request.name,
    questions: request.questions.map((question) => {
      question.id = `id${crypto.randomBytes(5).toString("hex")}s`;
      return question;
    }),
  };

  // handle unique name
  // 1. if name is do not changed
  if (lesson.name === request.name) {
    return prismaClient.lesson.update({
      where: {
        id: id,
      },
      data: request,
    });
  }

  // 2. if name changed , check is name already taken
  const name = await prismaClient.lesson.count({
    where: {
      name: request.name,
    },
  });

  if (name === 1) {
    throw new ResponseError(409, ["Lesson already exist"]);
  }

  return await prismaClient.lesson.update({
    where: {
      id: id,
    },
    data: request,
  });
};

const remove = async (id) => {
  id = validate(idSchema, id);

  const lesson = await prismaClient.lesson.findFirst({
    where: {
      id: id,
    },
  });

  if (!lesson) {
    throw new ResponseError(404, ["lesson not found"]);
  }

  return prismaClient.lesson.delete({
    where: {
      id: id,
    },
  });
};

const get = async () => {
  return await prismaClient.lesson.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

const getById = async ({ id, exame }) => {
  id = validate(idSchema, id);
  exame = validate(exameSchema, exame);

  const data = await prismaClient.lesson.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      questions: true,
    },
  });

  if (!data) {
    throw new ResponseError(404, ["Lesson not found"]);
  }

  if (!exame) {
    return data;
  } else {
    return {
      id: data.id,
      name: data.name,
      questions: data.questions.map(({ id, question, choice }) => {
        return { id, question, choice };
      }),
    };
  }
};

const submit = async ({ id, request }) => {
  id = validate(idSchema, id);
  request = validate(requestSubmitSchema, request);

  const data = await prismaClient.lesson.findFirst({
    where: {
      id: id,
    },
  });

  if (!data) {
    throw new ResponseError(404, ["Lesson not found"]);
  }

  const resultAnsware = data.questions.reduce((acc, curr) => {
    const questionId = curr.id; // 1
    const correctAnswer = curr.answer; // a

    const questionChoices = { ...curr.choice }; // {} {} {}{}
    // a === a
    if (request[questionId] === correctAnswer) {
      questionChoices[request[questionId]] = {
        text: curr.choice[correctAnswer],
        answer: true,
      };
    } else {
      questionChoices[request[questionId]] = {
        text: curr.choice[request[questionId]],
        answer: false,
      };
      questionChoices[correctAnswer] = {
        text: curr.choice[correctAnswer],
        answer: true,
      };
    }

    acc.push({
      question: curr.question,
      choice: questionChoices,
    });

    return acc;
  }, []);

  const correctAnswersCount = data.questions.reduce((acc, curr) => {
    const questionId = curr.id;
    const correctAnswer = curr.answer;

    if (request[questionId] === correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return {
    data: resultAnsware,
    truth: correctAnswersCount,
  };
};

export default { create, update, remove, get, getById, submit };
