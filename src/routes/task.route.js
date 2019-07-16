const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res) => {

    const tasks = await Task.find();
    console.log(tasks);
    res.json(tasks);
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

router.post('/', async (req, res) => {
    const {
        nombre,
        numero_canal,
        HD
    } = req.body;
    const task = new Task({
        nombre,
        numero_canal,
        HD
    });
    console.log(task);
    await task.save();
    res.json({
        status: 'Task Saved'
    });
});

router.put('/:id', async (req, res) => {
    const {
        nombre,
        numero_canal,
        HD
    } = req.body;
    const newTask = {
        nombre,
        numero_canal,
        HD
    };
    await Task.findByIdAndUpdate(req.params.id, newTask);
    //await (req.params.id, newTask);
    res.json({
        status: 'Task Updated'
    });
});

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    //await (req.params.id, newTask);
    res.json({
        status: 'Task Deleted'
    });
});

module.exports = router;