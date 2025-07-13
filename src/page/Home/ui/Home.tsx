import { CreateToDo } from "@/feature/createToDo";
import { useHomeStore } from "../model/homeStore";
import React from "react";
import { Button } from "@/shared/ui/button";
import { ToDoList } from "@/feature/toDoList";

const Home: React.FC = () => {
  const {status, viewcreatetodo, setViewCreateTodo, setStatus } = useHomeStore();
  return (
    <>
      <div className="flex justify-center gap-8 p-3.5">
        <Button onClick={() => setStatus('all')}>All</Button>
        <Button onClick={() => setStatus('todo')}>Todo</Button>
        <Button onClick={() => setStatus('in progress')}>in Progress</Button>
        <Button onClick={() => setStatus('done')}>Done</Button>
        <Button className="bg-green-400" onClick={setViewCreateTodo}>Create</Button>
        {viewcreatetodo && <CreateToDo />}
      </div>
    <ToDoList status={status}/>
    </>
  );
};
export default Home;
