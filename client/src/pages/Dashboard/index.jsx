import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ data, setData }) => {
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Task</button>
        <div className="flex space-x-4">
          {data.columnOrder.map(columnId => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

            return (
              <Column key={column.id} column={column} tasks={tasks} />
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

const Column = ({ column, tasks }) => {
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
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

const Task = ({ task, index }) => {

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${task.id}`);
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
            <button className="bg-red-500 text-white px-2 py-1 rounded mr-2">Delete</button>
            <button  onClick={handleEdit} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
            <button className="bg-blue-500 text-white px-2 py-1 rounded">View Details</button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Dashboard;
