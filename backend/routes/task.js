const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Criar uma nova tarefa
router.post('/', async (req, res) => {
    const { title, message } = req.body;
    const newTask = new Task({ title, message });
    await newTask.save();
    res.json(newTask);
});

// Listar todas as tarefas
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Atualizar uma tarefa
router.put('/:id', async (req, res) => {
    const { title, message } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, message }, { new: true });
    res.json(updatedTask);
});

// Deletar uma tarefa
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tarefa deletada com sucesso!' });
});

module.exports = router;
