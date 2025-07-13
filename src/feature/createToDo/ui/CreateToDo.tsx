import { DatePickerDemo } from '@/shared/ui/datapicker'
import React, { useState } from 'react'
import { useCreateStore } from '../model/createstore'
import { Button } from '@/shared/ui/button'
import { toast } from 'sonner'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group"
import { useHomeStore } from '@/page/Home/model/homeStore'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/shared/ui/card"
import { Label } from "@/shared/ui/label"
import { X } from "lucide-react"

export const CreateToDo: React.FC = () => {
  const { nowdate, setnowdate } = useCreateStore()
  const { setViewCreateTodo } = useHomeStore()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo'
  })

  const formChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleStatusChange = (value: string) => {
    setFormData({ ...formData, status: value })
  }

  const saveTodo = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      toast.error("Заголовок обязателен")
      return
    }
    const todoCount = Number(localStorage.getItem('todoCount') || 0)
    const newTodoId = todoCount + 1
    const newTodo = {
      id: newTodoId,
      ...formData,
      date: nowdate,
      createdAt: new Date().toISOString()
    }
    localStorage.setItem(`${newTodoId}`, JSON.stringify(newTodo))
    localStorage.setItem('todoCount', `${newTodoId}`)
    setViewCreateTodo()
    toast.success("Заметка успешно создана!")
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <CardTitle>Создать новую задачу</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute right-4 top-4 rounded-full"
            onClick={setViewCreateTodo}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={saveTodo} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={formChange}
                placeholder="Введите заголовок"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={formChange}
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
              <DatePickerDemo state={nowdate} func={setnowdate} />
            </div>

            <CardFooter className="px-0 pb-0 pt-4">
              <Button type="submit" className="w-full">
                Создать задачу
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}