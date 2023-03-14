import React, { useEffect, useState, useRef } from "react";

import TodoItem from "components/TodoItem";

import { todoListMocks } from 'fixtures/getTodoListMocks';

import { ItoDoItem } from "types/ItoDoItem";

const ToDoList = () => {
    const [toDoInfo, setToDoInfo] = useState<ItoDoItem[]>(
        localStorage.length > 0 ? JSON.parse( localStorage.getItem("todoList") || '{}' ) : todoListMocks
    );
    
    // filtered lists
    const [uncompletedList, setUncompletedList] = useState<ItoDoItem[]>([]);
    const [completedList, setCompletedList] = useState<ItoDoItem[]>([]);

    const inputTask = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setCompletedList( toDoInfo.filter((item: ItoDoItem) => item.completed === true) ) 
        setUncompletedList( toDoInfo.filter((item: ItoDoItem) => item.completed === false) ) 
        localStorage.setItem('todoList', JSON.stringify(toDoInfo))
    }, [toDoInfo])
    
    // generate to do list
    const finalTasks = [...uncompletedList, ...completedList].map((item : ItoDoItem) => {
        return <TodoItem 
            description = {item.text}
            defCheck = {item.completed}
            handleChange = {() => handleChange(item.id)}
            handleDelete = {() => removeTask(item.id)}
            key = {item.id}
        />
    })
    

    // Change checkbox status
    const handleChange = (id: number):void => {
        const tempArr = toDoInfo.map((item: ItoDoItem) => {
            if(item.id === id) item.completed = !item.completed;
            return item;
        })
        setToDoInfo( tempArr );
    }

    
    const addNewTask = ():void => {
        if(inputTask.current) {
            const redactedText: string = inputTask.current.value.trim();
            let lastIndex = toDoInfo.length > 0 ? toDoInfo[toDoInfo.length - 1].id : 1;
            if(isNaN( Number(redactedText) ) && redactedText.length > 0) {
                setToDoInfo( [...toDoInfo, ...[{id: lastIndex + 1, text: redactedText, completed: false}]] )
            }
            //clear input
            inputTask.current.value = '';
        }
    }

    const removeTask = (taskId:number):void => {
        setToDoInfo( toDoInfo.filter(item => item.id !== taskId) );
    }

    const removeAllTask = ():void => setToDoInfo([])

    return (
        <div className='w-2/3 m-auto bg-white rounded-lg shadow-md font-inter'>
                <h2 className='font-semibold text-5xl leading-10 mb-8 mt-20 text-darkBlue font-rubick'>Daily To Do List</h2>
                <div className='border border-zinc-600 rounded-md max-w-xl m-auto text-left flex justify-between p-5 mb-14'>
                    <input 
                        className="outline-none w-5/6 text-xl"
                        placeholder="Add new list item"
                        ref={inputTask}
                        onKeyDown={(event) => event.key === "Enter" && addNewTask()}
                    />
                    <button onClick={addNewTask} className="py-3 px-7 -m-3.5 bg-blue text-white rounded-md hover:bg-darkBlue">Add</button>
                </div>     
                <div className="last:mb-20">
                    {finalTasks}
                </div>  
                <div className="flex justify-between max-w-xl m-auto p-6 border-t text-base leading-4 font-normal text-slate-400">
                    <p>{toDoInfo.length} item selected</p>
                    <p onClick = {removeAllTask} className="hover:text-blue cursor-pointer">Clear All</p>
                </div>
        </div>
    )
}

export default ToDoList;