import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { TodoContextType } from '../contexts/TodoContextType';
import TodoListItem from './TodoListItem';

const TodoList = () => {
  const { todos } = useContext<TodoContextType>(TodoContext);

  return (
    <table className="uk-table">
      <caption>Lista de Tarefas</caption>
      <thead>
        <tr>
          <th>#</th>
          <th>Tarefa</th>
          <th></th>
        </tr>

        {todos?.map((todo) => (
          <TodoListItem todo={todo} key={todo.id} />
        ))}
      </thead>
    </table>
  );
};

export default TodoList;
