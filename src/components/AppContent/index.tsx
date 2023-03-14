import React from "react";
import ToDoList from "components/TodoList";

const AppContent = () => {
    return (
        <main className="max-w-screen-2xl m-auto bg-sky-50 min-h-screen flex">
            <ToDoList />
        </main>
    )
}

export default AppContent;