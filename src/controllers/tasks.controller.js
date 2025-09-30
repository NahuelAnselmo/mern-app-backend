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
  try {
    console.log('getTask req.params.id:', req.params.id);
    console.log('getTask req.user:', req.user);
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!task)
      return res.status(404).json({ message: 'The task could not be found.' });
    res.json(task);
  } catch (error) {
    console.error('getTask error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!task) return res.status(404).json({ message: 'task not found' });
    return res.sendStatus(204);
  } catch (error) {
    console.error('deleteTask error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
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
  } catch (error) {
    console.error('updateTask error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};