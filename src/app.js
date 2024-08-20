const express= require('express');
const { addTodo, getTodo, deleteTodo, listTodos } = require('./todoManager.js');

const app = express();
app.use(express.json());
console.log("test1")

app.post('/todos', (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }
  const todo = addTodo(task);
  res.status(201).json(todo);
});

app.get('/todos/:id', (req, res) => {
  const todo = getTodo(Number(req.params.id));
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.delete('/todos/:id', (req, res) => {
  const success = deleteTodo(Number(req.params.id));
  if (success) {
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.get('/todos', (req, res) => {
  res.json(listTodos());
});



module.exports= app;
