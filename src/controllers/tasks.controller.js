/* eslint-disable import/no-named-as-default */
// eslint-disable-next-line import/no-unresolved, import/no-named-as-default-member
import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id,
  }).populate('user');
  res.json(tasks);
};

export const createTasks = async (req, res) => {
  const { title, description, date } = req.body;

  const newTask = new Task({
    title,
    description,
    date,
    user: req.user.id,
  });
  const savedTask = await newTask.save();
  res.json(savedTask);
};

export const getTask = async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user.id,
  });
  if (!task)
    return res.status(404).json({ message: 'The task could not be deleted.' });
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });
  if (!task) return res.status(404).json({ message: 'task no found' });
  return res.sendStatus(204);
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    {
      _id: req.params.id,
      user: req.user.id,
    },
    req.body,
    { new: true },
  );
  if (!task)
    return res.status(404).json({ message: 'The task could not be edited.' });
  res.json(task);
};
