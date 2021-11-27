import React, { createContext, useEffect, useState } from 'react';
import { Todo } from '../models/Todo';
import { get, save } from '../services/TodoService';
import { TodoContextType } from './TodoContextType';

export const TodoContext = createContext<TodoContextType>({
  // Inicialização de propriedades e métodos.
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  toggle: () => {},
});

const TodoProvider = (props: any) => {
  // Inicializa com os todos do storage caso existam.
  const [todos, setTodos] = useState<Todo[]>(get);

  // useEffect "observa" um objeto e executa uma ação sempre que este for alterado
  // sempre que algo for alterado no array de todos, salva no storage.
  useEffect(() => save(todos), [todos]);

  const addTodo = (title: string) => {
    const todo: Todo = { id: todos.length + 1, title, done: false };

    // atualiza o array de todos
    setTodos([...todos, todo]);
  };

  const removeTodo = (todo: Todo) => {
    const index = todos.indexOf(todo);
    const filteredTodos = todos.filter((todo, i) => i !== index);

    setTodos(filteredTodos);
    if (filteredTodos.length === 0) localStorage.clear();
  };

  const toggle = (todo: Todo) => {
    const index = todos.indexOf(todo);
    todos[index].done = !todo.done;
    setTodos([...todos]);
  };

  return (
    // Tudo que for passado no value estará disponível para consumo do props.children.
    <TodoContext.Provider value={{ todos, addTodo, removeTodo, toggle }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
