import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const EditTask = ({ data, setData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = data.tasks[id];
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    const updatedTask = { ...task, title, description };
    setData((prevData) => ({
      ...prevData,
      tasks: {
        ...prevData.tasks,
        [id]: updatedTask,
      },
    }));
    navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Title:</label>
        <input
          className="w-full p-2 border border-gray-300 rounded mt-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description:</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mt-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)} rows="10" cols="50"
        ></textarea>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditTask;


