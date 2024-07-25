import {useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const TaskDetails = ({ data}) => {
  const navigate = useNavigate();
  
  const { id } = useParams();

  const task = data.tasks[id];
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [createdAt, setCreatedAt] = useState(task.createdAt);

  const handleCancel = () => {
      navigate('/dashboard');
  }; 

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <div className="p-4 border rounded shadow">
        <h2 className="text-xl font-semibold">Title: {title}</h2>
        <p>Description: {description}</p>
        <p>Created at: {createdAt}</p>
        <div className="flex justify-end space-x-4">
            <button 
                onClick={handleCancel} 
                className="mt-40 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Close
            </button>
       </div>
      </div>

    </div>
  );
}

export default TaskDetails;
