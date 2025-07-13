import React, { useEffect, useState } from 'react'
import { ToDoItem } from './ToDoItem'
import type { Todo } from '../type/todo.type';
import { useTodoListStore } from '../model/todoStore';


interface Props {
  status: 'all' | 'todo' | 'in progress' | 'done';
}

export const ToDoList: React.FC<Props> = ({ status }) => {
  const {render, setRender} = useTodoListStore()
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const todoCount = Number(localStorage.getItem('todoCount')) || 0;

   useEffect(() => {
    const loadTodos = () => {
      const loadedTodos: Todo[] = [];

      for (let i = 1; i <= todoCount; i++) {
        const todoString = localStorage.getItem(`${i}`);
        if (todoString) {
          loadedTodos.push(JSON.parse(todoString));
        }
      }
      setAllTodos(loadedTodos);
      setRender(false)
      if (status === 'all') {
      setFilteredTodos(loadedTodos);
    } else {
      setFilteredTodos(allTodos.filter(todo => todo.status === status));
    }
    };

    loadTodos();
  }, [status, todoCount, render]);



  return (
    <div className='w-full flex justify-center items-center flex-col text-center'>
      <div className='p-6'>{status}</div>
      {filteredTodos.length === 0 ? (
        <p className='text-center text-gray-500'>No tasks found</p>
      ) : (
        <ToDoItem todolist={filteredTodos} />
      )}
    </div>
  )
}
