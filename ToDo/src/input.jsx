import React, { useState, useEffect } from 'react';


function Input() {
  const [task, setTask] = useState(() => {
    const saved = localStorage.getItem("myTasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [delisOpen, setdelIsOpen] = useState(false);

  const [editText, setEditText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setdeleteIndex] = useState(null);

  const handleSub = (e) => {
    const input = document.getElementById("txt").value;
    if (!input) return;
    document.getElementById("txt").value = ""

    const newTask = {
      id: Date.now(),
      text: input,
      status: "Pending"
    };

    setTask(t => ([...task, newTask]));

    e.preventDefault();

  }

  function handleDelete(index) {
    setdeleteIndex(index);
    setdelIsOpen(true);

  }

  function confirmDelete() {
    setTask(task.filter((item) => item.id !== deleteIndex))
    setdelIsOpen(false);
  }

  function handleEdit(taskObject) {
    setEditIndex(taskObject.id);    // Store the ID instead of index
    setEditText(taskObject.text);  // Set the text for the input field
    setIsOpen(true);               // Open the modal
  }

  function saveEdit() {
    setTask(prev => prev.map(t =>
      t.id === editIndex ? { ...t, text: editText } : t
    ));
    setIsOpen(false);
  }

  const toggleStatus = (id) => {
    setTask(prevTasks =>
      prevTasks.map(t =>
        t.id === id
          ? { ...t, status: t.status === "Completed" ? "Pending" : "Completed" }
          : t
      )
    );
  };


  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(task));
  }, [task]);

  return (
    <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSub} className="flex flex-col sm:flex-row gap-3 w-full max-w-md p-6 bg-white rounded-xl shadow-md">

        <input
          type="text"
          name="task"
          id="txt"
          placeholder="Enter a task..."
          className="flex-1 px-4 py-2 bg-gray-100 border-2 border-transparent rounded-lg outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 active:transform active:scale-95 transition-all"
        >
          ADD
        </button>

      </form>



      {task.length === 0 ? (
        /* Placeholder / Empty State */
        <div className="mt-10 flex flex-col items-center opacity-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-500 font-medium">No tasks yet. Add one above!</p>
        </div>
      ) :
        task.map((tsk) => (
          <div
            key={tsk.id}
            className="mt-4 p-4 w-full max-w-md bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-between group hover:border-blue-300 transition-colors"
          >
            {/* Left Side: Task Content */}
            <div className="flex items-center overflow-hidden">
              <button
                onClick={() => toggleStatus(tsk.id)}
                className={`mr-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${tsk.status === "Completed"
                    ? "bg-green-500 border-green-500 shadow-sm"
                    : "border-gray-300 bg-white hover:border-blue-400"
                  }`}
              >
                {/* Show checkmark only if completed */}
                {tsk.status === "Completed" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <p className={`ml-3 font-medium transition-colors ${tsk.status === "Completed" ? "line-through text-gray-400" : "text-gray-700"
                }`}>
                {tsk.text}
              </p>
            </div>

            {/* Right Side: Action Buttons */}
            <div className="flex gap-1 ml-4 flex-shrink-0">
              {/* Edit Button */}
              <button
                onClick={() => handleEdit(tsk)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                title="Edit Task"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(tsk.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Delete Task"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>

            </div>
          </div>
        ))}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Edit Task</h3>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-2">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700">Cancel</button>
              <button onClick={saveEdit} className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700">Save</button>
            </div>
          </div>
        </div>
      )}

      {delisOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setdelIsOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-bold text-red-800 mb-4">DELETE TASK</h3>

            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-2">
              <button onClick={() => setdelIsOpen(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700">Cancel</button>
              <button onClick={confirmDelete} className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700">DELETE</button>
            </div>
          </div>
        </div>
      )}


    </div>




  );

}

export default Input
