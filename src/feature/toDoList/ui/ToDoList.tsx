// import React, { useCallback, useEffect, useState } from "react";
// import { ToDoItem } from "./ToDoItem";
// import type { Todo } from "../type/todo.type";
// import { useTodoListStore } from "../model/todoStore";
// import { Input } from "@/shared/ui/input";
// import { DatePickerDemo } from "@/shared/ui/datapicker";
// import { Button } from "@/shared/ui/button";

// interface Props {
//   status: "all" | "todo" | "in progress" | "done";
// }

// export const ToDoList: React.FC<Props> = ({ status }) => {
//   const { render, setRender } = useTodoListStore();
//   const [allTodos, setAllTodos] = useState<Todo[]>([]);
//   const [selectedStartDate, setStartSelectedDate] = useState<Date | undefined>();
//   const [selectedEndDate, setEndSelectedDate] = useState<Date | undefined>();
//   const [paramSearch, setParamSearch] = useState({
//     searh: "",
//     startDate: "",
//     endDate: "",
//   });
//   const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
//   const todoCount = Number(localStorage.getItem("todoCount")) || 0;

//   const loadTodos = useCallback(() => {
//     const loadedTodos: Todo[] = [];

//     for (let i = 1; i <= todoCount; i++) {
//       const todoString = localStorage.getItem(`${i}`);
//       if (todoString) {
//         loadedTodos.push(JSON.parse(todoString));
//         console.log(JSON.parse(todoString));
//       }
//     }

//     setAllTodos(loadedTodos);
//     setRender(false);
//     if (status === "all") {
//       setFilteredTodos(loadedTodos);
//     } else {
//       setFilteredTodos(allTodos.filter((todo) => todo.status === status));
//     }
//   }, [todoCount, setRender, status]);

//   useEffect(() => {
//     loadTodos();
//   }, [status, todoCount, render]);

//   const filterForSearch = () => {
//     setFilteredTodos(filteredTodos.filter((todo) => todo.title.toLowerCase().includes(paramSearch.searh) ));
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setParamSearch((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleStartDateChange = (date: Date | undefined) => {
//     setStartSelectedDate(date);
//     if (date) {
//       setParamSearch((prev) => ({
//         ...prev,
//         startDate: date.toISOString(),
//       }));
//     }
//   };

//   const handleEndDateChange = (date: Date | undefined) => {
//     setEndSelectedDate(date);
//     if (date) {
//       setParamSearch((prev) => ({
//         ...prev,
//         endDate: date.toISOString(),
//       }));
//     }
//   };

//   return (
//     <div className="w-full flex justify-center items-center flex-col text-center">
//       <div className="flex flex-row items-center">
//         <Input
//           value={paramSearch.searh}
//           onChange={(e) => handleChange(e)}
//           placeholder="Поиск"
//           className="w-2xs"
//         />
//         <DatePickerDemo state={selectedStartDate} func={handleStartDateChange} />
//         <DatePickerDemo state={selectedEndDate} func={handleEndDateChange} />
//         <Button onClick={filterForSearch}>Поиск</Button>
//       </div>
//       <div className="p-6">{status}</div>
//       {filteredTodos.length === 0 ? (
//         <p className="text-center text-gray-500">No tasks found</p>
//       ) : (
//         <ToDoItem todolist={filteredTodos} />
//       )}
//     </div>
//   );
// };
import React, { useCallback, useEffect, useState } from "react";
import { ToDoItem } from "./ToDoItem";
import type { Todo } from "../type/todo.type";
import { useTodoListStore } from "../model/todoStore";
import { Input } from "@/shared/ui/input";
import { DatePickerDemo } from "@/shared/ui/datapicker";
import { Button } from "@/shared/ui/button";
import { useDebounce } from "@/shared/hook/debounce";

interface Props {
  status: "all" | "todo" | "in progress" | "done";
}

export const ToDoList: React.FC<Props> = ({ status }) => {
  const { render, setRender } = useTodoListStore();
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [selectedStartDate, setStartSelectedDate] = useState<Date | undefined>();
  const [selectedEndDate, setEndSelectedDate] = useState<Date | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const todoCount = Number(localStorage.getItem("todoCount")) || 0;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const loadTodos = useCallback(() => {
    const loadedTodos: Todo[] = [];

    for (let i = 1; i <= todoCount; i++) {
      const todoString = localStorage.getItem(`${i}`);
      if (todoString) {
        loadedTodos.push(JSON.parse(todoString));
      }
    }

    setAllTodos(loadedTodos);
    setRender(false);
  }, [todoCount, setRender]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos, render]);

  const applyFilters = useCallback(() => {
    let result = [...allTodos];

    if (status !== "all") {
      result = result.filter((todo) => todo.status === status);
    }

    if (debouncedSearchTerm) {
      const searchinput = debouncedSearchTerm.toLowerCase();
      result = result.filter((todo) =>
        todo.title.toLowerCase().includes(searchinput)
      );
    }

    if (selectedStartDate) {
      const startDate = new Date(selectedStartDate);
      startDate.setHours(0, 0, 0, 0);
      result = result.filter((todo) => {
        const todoDate = new Date(todo.startDate);
        return todoDate >= startDate;
      });
    }
    if (selectedEndDate) {
      const endDateParam = new Date(selectedEndDate);
      endDateParam.setHours(23, 59, 59, 999);
      result = result.filter((todo) => {
        const startdata = new Date(todo.startDate);
        if (endDateParam && startdata > endDateParam) return false
        if (!todo.endDate) return true;
        const todoDate = new Date(todo.endDate);
        console.log('asd')
        return todoDate <= endDateParam;
      });
    }

    setFilteredTodos(result);
  }, [allTodos, status, debouncedSearchTerm, selectedStartDate, selectedEndDate]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setStartSelectedDate(date);
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndSelectedDate(date);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStartSelectedDate(undefined);
    setEndSelectedDate(undefined);
  };

  return (
    <div className="w-full flex justify-center items-center flex-col text-center">
      <div className="flex flex-row justify-center items-center gap-2 mb-4 w-full  px-4">
        <Button onClick={resetFilters}>Reset</Button>
        <Input
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Поиск по названию"
          className="w-full md:w-64"
        />
        
        <div className="flex flex-row gap-2 w-2xs ">
          от
          <DatePickerDemo 
            state={selectedStartDate} 
            func={handleStartDateChange} 
          />
          до
          <DatePickerDemo 
            state={selectedEndDate} 
            func={handleEndDateChange} 
          />
        </div>
        
      </div>

      <div className="w-full p-2 max-w-4xl">
        {status}
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            {searchTerm || selectedStartDate || selectedEndDate
              ? "Задачи не найдены"
              : "Нет задач по выбранному статусу"}
          </p>
        ) : (
          <ToDoItem todolist={filteredTodos} />
        )}
      </div>
    </div>
  );
};