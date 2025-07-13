import React from 'react';
import type { Todo } from '../type/todo.type';
import { Button } from '@/shared/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTodoListStore } from '../model/todoStore';
const EditToDo = React.lazy(() => import('./EditToDo'))

interface ToDoItemProps {
  todolist: Todo[];
}
export const ToDoItem: React.FC<ToDoItemProps> = React.memo(({ todolist }) => {
  const {setRender, setEditVisible, editVisible} = useTodoListStore()
  const deleteTodo = (id: number) => {
    try{
      localStorage.removeItem(id.toString())
      setRender(true)
      toast('заметка удалена')
    }catch(e){
      toast('error')
      console.log(e)
    }
    
  } 
  return (
    <div className='flex flex-col gap-4 w-full max-w-md mx-auto'>
      {todolist?.map((item, index) => (
        <div 
          key={index} 
          className='p-4 border rounded-lg shadow-sm break-words overflow-hidden'
        >
          <div className=' flex justify-end items-end'>
            <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-500 hover:text-blue-500 hover:bg-blue-50"
                  onClick={() => setEditVisible(item.id)}
                  >
                  <Pencil className='h-4 w-4' />
            </Button>
            <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                  onClick={() => deleteTodo(item.id)}
                  >
                  <Trash2 className='h-4 w-4' />
            </Button>
          </div>
          <h4 className='font-medium text-lg mb-2 truncate'>{item.title}</h4>
          <p className='text-gray-600 text-pretty line-clamp-3'>
            {item.description}
          </p>
          <div className='mt-3 flex justify-between items-center text-sm'>
            <span className={`px-2 py-1 rounded capitalize ${
              item.status === 'done' ? 'bg-green-100 text-green-800' :
              item.status === 'in progress' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {item.status}
            </span>
            <div className="flex flex-col">
            <span className='text-gray-400 whitespace-nowrap'>
                от {new Date(item.startDate).toLocaleDateString()}
              </span>
            {item.endDate && (
              <span className='text-gray-400 whitespace-nowrap'>
                до {new Date(item.endDate).toLocaleDateString()}
              </span>
            )}
            {item.updatedAt && (
              <span className='text-gray-400 whitespace-nowrap'>
                обновлен: {new Date(item.updatedAt).toLocaleDateString()}
              </span>
            )}

          </div>
          </div>
          {editVisible === item.id && (
            <React.Suspense fallback={null}>
              <EditToDo 
                id={item.id} 
              />
            </React.Suspense>
          )}
        </div>
      ))}
      
    </div>
  );
}, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.todolist) === JSON.stringify(nextProps.todolist);
});
