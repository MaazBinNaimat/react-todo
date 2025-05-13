import React, { useState } from 'react'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"


const App = () => {
  const [Title, setTitle] = useState("");
  const [Desc, setDesc] = useState("");
  const [Task, setTask] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!Title.trim() || !Desc.trim()) {
      alert("Please fill both fields");
      return;
    }

    if (isEditMode) {
      const updatedTasks = [...Task];
      updatedTasks[editIndex] = {
        ...updatedTasks[editIndex],
        Title,
        Desc
      };
      setTask(updatedTasks);
      setIsEditMode(false);
      setEditIndex(null);
    } else {
      setTask([...Task, { Title, Desc, isCompleted: false }]);
    }

    setTitle("");
    setDesc("");
  }

  const deleteHandler = (i) => {
    let delTask = [...Task];
    delTask.splice(i, 1);
    setTask(delTask);
  }

  const completeHandler = (i) => {
    let updateTask = [...Task];
    updateTask[i].isCompleted = !updateTask[i].isCompleted;
    setTask(updateTask);
  }

  const editHandler = (i) => {
    setIsEditMode(true);
    setEditIndex(i);
    setTitle(Task[i].Title);
    setDesc(Task[i].Desc);
  }

  let renderTask = <h2 className='bg-amber-200 p-8'>No Task available To Do</h2>
  if (Task.length > 0) {
    renderTask = Task.map((t, i) => {
      return (
        <div key={i} className='bg-amber-100 p-8'>
          <li className='flex items-center justify-between'>
            <h1>{i + 1}</h1>

            <h5 className={`m-3 font-semibold text-2xl ${t.isCompleted ? 'line-through text-gray-400' : ''}`}>
              {t.Title}
            </h5>
            <h5 className={`m-3 text-xl ${t.isCompleted ? 'line-through text-gray-400' : ''}`}>
              {t.Desc}
            </h5>

            <button
              onClick={() => completeHandler(i)}
              className={`px-4 py-2 rounded text-white ${t.isCompleted ? 'bg-gray-400' : 'bg-green-400'}`}>
              {t.isCompleted ? 'Undo' : 'Complete'}
            </button>

            <button
              onClick={() => editHandler(i)}
              className='bg-blue-400 px-4 py-2 rounded text-white'
            >Edit</button>

            <button
              onClick={() => deleteHandler(i)}
              className='bg-red-400 px-4 py-2 rounded text-white'>
              Remove
            </button>
          </li>
        </div>
      )
    });
  }

  return (
    <>
      <h1 className='text-5xl bg-black text-white font-bold text-center p-5'>Todo List</h1>
      <div className="flex items-center justify-center">
        <form onSubmit={submitHandler}>
          <input
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            className='p-3 border-2 rounded m-3'
            type="text"
            placeholder='Enter task title' />

          <input
            value={Desc}
            onChange={(e) => setDesc(e.target.value)}
            className='m-5 p-3 border-2 rounded'
            type="text"
            placeholder='Enter task description' />

          <button className='bg-black text-white px-4 py-2 rounded'>
            {isEditMode ? 'Update Task' : 'Submit'}
          </button>
        </form>
      </div>

      <div>
        <ul>
          {renderTask}
        </ul>
      </div>
      {/* for vercel data fetching */}
      <Analytics />
      <SpeedInsights/>
    </>
  )
}

export default App;
