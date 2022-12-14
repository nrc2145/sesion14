import { User } from '../../models';
import { ClientError } from '../../error';

export const getAllUsers = async () => {
  const todos = await User.find();
  return todos;
};

export const getUserById = async (userId) => {
  const todo = User.findById(userId);
  return todo;
};

export const updateUser = async (userId, payload) => {
  const result = await User.updateOne({ _id: userId }, payload);
  return result;
};

export const deleteUser = async (userId) => {
  const result = await User.deleteOne({ _id: userId });
  return result;
};

export const registerUser = async (payload) => {
  try {
    const newTodo = new User(payload);
    await newTodo.save();
    return newTodo;
  } catch (error) {
    if (error.code === 11000) throw new ClientError('Usuario no disponible');
    else throw error;
  }
};
