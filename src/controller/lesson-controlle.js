import lessonService from "../service/lesson-servic.js";

const create = async (req, res, next) => {
  try {
    await lessonService.create(req.body);
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const request = req.body;

    await lessonService.update({ id, request });
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;

    await lessonService.remove(id);
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await lessonService.get();

    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const exame = req.query.exame || false;

    const result = await lessonService.getById({ id, exame });

    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

const submit = async (req, res, next) => {
  try {
    const id = req.params.id;
    const request = req.body;

    const result = await lessonService.submit({ id, request });

    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

export default { create, update, remove, get, getById, submit };
