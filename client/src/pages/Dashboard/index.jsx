import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ data, setData }) => {
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', columnId: 'todo' });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('recent');

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });

      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };

  const handleDelete = (taskId) => {
    const updatedTasks = { ...data.tasks };
    delete updatedTasks[taskId];

    const updatedColumns = { ...data.columns };
    for (const columnId in updatedColumns) {
      const column = updatedColumns[columnId];
      column.taskIds = column.taskIds.filter(id => id !== taskId);
    }

    setData({
      ...data,
      tasks: updatedTasks,
      columns: updatedColumns,
    });
  };

  const handleAddTask = () => {
    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    const newTaskData = {
      id: newTaskId,
      title: newTask.title,
      description: newTask.description,
      createdAt: new Date().toLocaleString(),
    };

    const updatedTasks = {
      ...data.tasks,
      [newTaskId]: newTaskData,
    };

    const column = data.columns[newTask.columnId];
    const updatedColumn = {
      ...column,
      taskIds: [...column.taskIds, newTaskId],
    };

    setData({
      ...data,
      tasks: updatedTasks,
      columns: {
        ...data.columns,
        [updatedColumn.id]: updatedColumn,
      },
    });

    setShowForm(false);
    setNewTask({ title: '', description: '', columnId: 'todo' });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e) => {
    setSortCriteria(e.target.value);
  };

  const getFilteredTasks = (tasks) => {
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getSortedTasks = (tasks) => {
    if (sortCriteria === 'recent') {
      return tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortCriteria === 'title') {
      return tasks.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tasks;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search Tasks..."
              value={searchQuery}
              onChange={handleSearch}
              className="border p-2 rounded"
            />
            <select value={sortCriteria} onChange={handleSort} className="border p-2 rounded">
              <option value="recent">Sort By: Recent</option>
              <option value="title">Sort By: Title</option>
            </select>
          </div>
        </div>
        {showForm && (
          <div className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-lg font-bold mb-4">Add New Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <select
              value={newTask.columnId}
              onChange={(e) => setNewTask({ ...newTask, columnId: e.target.value })}
              className="border p-2 mb-2 w-full"
            >
              {data.columnOrder.map(columnId => (
                <option key={columnId} value={columnId}>{data.columns[columnId].title}</option>
              ))}
            </select>
            <button onClick={handleAddTask} className="bg-green-500 text-white px-4 py-2 rounded">Add Task</button>
            <button onClick={() => setShowForm(false)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
          </div>
        )}
        <div className="flex space-x-4">
          {data.columnOrder.map(columnId => {
            const column = data.columns[columnId];
            let tasks = column.taskIds.map(taskId => data.tasks[taskId]);
            tasks = getFilteredTasks(tasks);
            tasks = getSortedTasks(tasks);

            return (
              <Column key={column.id} column={column} tasks={tasks} onDelete={handleDelete}/>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

const Column = ({ column, tasks, onDelete }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md w-1/3">
      <h2 className="font-bold text-lg mb-4">{column.title}</h2>
      <Droppable droppableId={column.id}>
        {provided => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} onDelete={onDelete} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

const Task = ({ task, index, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${task.id}`);
  };

  const handleViewDetails = () => {
    navigate(`/task/${task.id}`);
  };

  return (
        <Draggable draggableId={task.id} index={index}>
          {provided => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className="bg-blue-200 p-4 rounded-md"
            >
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-xs text-gray-500">Created at: {task.createdAt}</p>
              <div className="mt-2">
                <button onClick={() => onDelete(task.id)} className="bg-red-500 text-white px-2 py-1 rounded mr-2">Delete</button>
                <button onClick={handleEdit} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={handleViewDetails} className="bg-blue-500 text-white px-2 py-1 rounded">View Details</button >
              </div>
            </div>
          )}
        </Draggable>
      );
    };
    
export default Dashboard;
    