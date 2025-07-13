import React, { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group'
import { DatePickerDemo } from '@/shared/ui/datapicker'
import { toast } from 'sonner'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/shared/ui/card'
import { Label } from '@/shared/ui/label'
import { X } from 'lucide-react'
import type { Todo } from '../type/todo.type'
import { useTodoListStore } from '../model/todoStore'

interface Props {
  id: number
}

export const EditToDo: React.FC<Props> = ({ id }) => {
  const {setEditVisible, setRender} =useTodoListStore();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [formData, setFormData] = useState<Todo>({
    id: 0,
    title: '',
    description: '',
    status: 'todo',
    date: new Date().toISOString(), 
    createdAt: ''
  })

  useEffect(() => {
    const todoString = localStorage.getItem(`${id}`)
    if (todoString) {
      const todoData = JSON.parse(todoString)
      setFormData(todoData)
      if (todoData.date) {
        setSelectedDate(new Date(todoData.date))
      }
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value: 'todo' | 'in progress' | 'done') => {
    setFormData(prev => ({ ...prev, status: value }))
  }

 const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      setFormData(prev => ({ 
        ...prev, 
        date: date.toISOString() 
      }))
    }
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error('Заголовок обязателен')
      return
    }

    const updatedTodo = {
      ...formData,
      updatedAt: new Date().toISOString()
    }

    localStorage.setItem(`${id}`, JSON.stringify(updatedTodo))
    setEditVisible(false)
    setRender(true)
    toast.success('Задача успешно обновлена')
    
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <CardTitle>Редактирование задачи</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute right-4 top-4 rounded-full"
            onClick={() => setEditVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Введите заголовок"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Добавьте описание"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Статус</Label>
              <ToggleGroup 
                type="single" 
                value={formData.status}
                onValueChange={handleStatusChange}
                className="grid grid-cols-3 gap-2"
              >
                <ToggleGroupItem 
                  value="todo" 
                  className="data-[state=on]:bg-blue-500 data-[state=on]:text-white"
                >
                  To Do
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="in progress" 
                  className="data-[state=on]:bg-yellow-500 data-[state=on]:text-white"
                >
                  In Progress
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="done" 
                  className="data-[state=on]:bg-green-500 data-[state=on]:text-white"
                >
                  Done
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-2">
              <Label>Дата выполнения</Label>
              <DatePickerDemo 
                state={selectedDate} 
                func={handleDateChange} 
              />
            </div>

            <CardFooter className="px-0 pb-0 pt-4">
              <Button type="submit" className="w-full">
                Сохранить изменения
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}