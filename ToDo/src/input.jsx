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

  const [filter, setfilter] = useState("all");

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
        const theme = localStorage.getItem('theme');
        return theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

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
    setEditIndex(taskObject.id);
    setEditText(taskObject.text);
    setIsOpen(true);
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

  function filtertab(filtertype) {
    setfilter(filtertype);
  }

  const filteredTasks =
    filter === "all"
      ? task
      : task.filter(t => t.status === filter);

  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(task));
  }, [task]);

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#0d1117] flex flex-col items-center py-12 px-4 font-sans text-[#24292f] dark:text-[#c9d1d9] transition-colors duration-300">
      
      {/* Header Section */}
      <div className="w-full max-w-lg mb-8 text-center space-y-2 relative">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#24292f] dark:text-white">
          My Tasks
        </h1>
        <p className="text-[#57606a] dark:text-[#8b949e] font-medium">Build software better, together.</p>
        
        {/* Theme Toggle Button */}
        <button 
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-0 right-0 p-2 rounded-md hover:bg-[#eaeef2] dark:hover:bg-[#21262d] transition-colors text-[#57606a] dark:text-[#8b949e]"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            )}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="w-full max-w-lg mb-6 p-1 bg-[#eaeef2] dark:bg-[#21262d] rounded-md flex justify-center shadow-sm border border-[#d0d7de] dark:border-[#30363d]">
        <div className="flex w-full gap-1">
            {['all', 'Pending', 'Completed'].map((type) => (
                <button 
                    key={type}
                    className={`flex-1 px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                        filter === type 
                        ? "bg-white dark:bg-[#161b22] shadow-sm text-[#24292f] dark:text-[#c9d1d9] border border-[#d0d7de] dark:border-[#30363d]" 
                        : "text-[#57606a] dark:text-[#8b949e] hover:text-[#24292f] dark:hover:text-[#c9d1d9] hover:bg-[#afb8c133] dark:hover:bg-[#8b949e1a]"
                    }`}
                    onClick={()=>filtertab(type)}
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
            ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSub} className="w-full max-w-lg bg-white dark:bg-[#161b22] rounded-md shadow-sm border border-[#d0d7de] dark:border-[#30363d] p-1 flex gap-2 mb-8 focus-within:ring-2 focus-within:ring-[#0969da] focus-within:border-[#0969da] transition-all">
        <input
          type="text"
          id="txt"
          placeholder="Add a new task..."
          className="flex-1 bg-transparent px-4 py-2 outline-none text-[#24292f] dark:text-[#c9d1d9] placeholder:text-[#57606a] dark:placeholder:text-[#6e7681] font-normal"
        />
        <button
          type="submit"
          className="bg-[#2da44e] hover:bg-[#2c974b] text-white px-4 py-1.5 rounded-md font-semibold text-sm transition-all border border-[#rgba(27,31,36,0.15)] shadow-sm flex items-center gap-2 m-1"
        >
          <span>Add</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
        </button>
      </form>

      {/* Task List Container */}
      <div className="w-full max-w-lg space-y-3 pb-20">
        {task.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white dark:bg-[#161b22] rounded-md border border-[#d0d7de] dark:border-[#30363d] border-dashed">
            <div className="w-16 h-16 bg-[#eaeef2] dark:bg-[#21262d] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#57606a] dark:text-[#8b949e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#24292f] dark:text-[#c9d1d9]">No tasks yet</h3>
            <p className="text-[#57606a] dark:text-[#8b949e] text-sm mt-1">Get started by creating a new task.</p>
          </div>
        ) : (
          filteredTasks.map((tsk) => (
            <div
              key={tsk.id}
              className={`group relative bg-white dark:bg-[#161b22] p-3 rounded-md flex items-center justify-between transition-all border border-[#d0d7de] dark:border-[#30363d] hover:border-[#0969da] dark:hover:border-[#58a6ff] ${
                tsk.status === "Completed" ? "bg-[#f6f8fa] dark:bg-[#0d1117] opacity-80" : "shadow-sm"
              }`}
            >
              {/* Left Side */}
              <div className="flex items-center gap-3 overflow-hidden flex-1">
                <button
                  onClick={() => toggleStatus(tsk.id)}
                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                    tsk.status === "Completed"
                      ? "bg-[#0969da] border-[#0969da] dark:bg-[#1f6feb] dark:border-[#1f6feb]"
                      : "border-[#d0d7de] dark:border-[#30363d] hover:border-[#0969da] dark:hover:border-[#58a6ff]"
                  }`}
                >
                  {tsk.status === "Completed" && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <span className={`text-[15px] font-normal truncate transition-all ${
                    tsk.status === "Completed" ? "text-[#57606a] dark:text-[#8b949e] line-through" : "text-[#24292f] dark:text-[#c9d1d9]"
                }`}>
                  {tsk.text}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(tsk)}
                  className="p-1.5 text-[#57606a] dark:text-[#8b949e] hover:text-[#0969da] dark:hover:text-[#58a6ff] hover:bg-[#eaeef2] dark:hover:bg-[#21262d] rounded-md transition-colors"
                  title="Edit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(tsk.id)}
                  className="p-1.5 text-[#57606a] dark:text-[#8b949e] hover:text-[#cf222e] dark:hover:text-[#f85149] hover:bg-[#ffebe9] dark:hover:bg-[#3d1816] rounded-md transition-colors"
                  title="Delete"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#24292f]/50 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />
          <div className="relative bg-white dark:bg-[#161b22] rounded-md shadow-xl border border-[#d0d7de] dark:border-[#30363d] w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-[#d0d7de] dark:border-[#30363d] bg-[#f6f8fa] dark:bg-[#0d1117] flex justify-between items-center">
              <h3 className="text-sm font-bold text-[#24292f] dark:text-[#c9d1d9]">Edit item</h3>
              <button onClick={() => setIsOpen(false)} className="text-[#57606a] dark:text-[#8b949e] hover:text-[#24292f] dark:hover:text-[#c9d1d9]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <label className="block text-sm font-semibold mb-2 text-[#24292f] dark:text-[#c9d1d9]">Task Description</label>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#f6f8fa] dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] rounded-md focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] outline-none transition-all text-[#24292f] dark:text-[#c9d1d9]"
                autoFocus
              />
            </div>
            <div className="bg-[#f6f8fa] dark:bg-[#0d1117] px-4 py-3 flex justify-end gap-2 border-t border-[#d0d7de] dark:border-[#30363d]">
              <button 
                onClick={() => setIsOpen(false)} 
                className="px-4 py-1.5 text-[#24292f] dark:text-[#c9d1d9] bg-[#f6f8fa] dark:bg-[#21262d] border border-[#d0d7de] dark:border-[#30363d] hover:bg-[#ebf0f4] dark:hover:bg-[#30363d] rounded-md text-sm font-medium transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button 
                onClick={saveEdit} 
                className="px-4 py-1.5 bg-[#2da44e] hover:bg-[#2c974b] text-white border border-[rgba(27,31,36,0.15)] rounded-md text-sm font-semibold shadow-sm transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {delisOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#24292f]/50 backdrop-blur-sm transition-opacity" onClick={() => setdelIsOpen(false)} />
          <div className="relative bg-white dark:bg-[#161b22] rounded-md shadow-xl border border-[#d0d7de] dark:border-[#30363d] w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-[#d0d7de] dark:border-[#30363d] bg-[#f6f8fa] dark:bg-[#0d1117] flex justify-between items-center">
                <h3 className="text-sm font-bold text-[#24292f] dark:text-[#c9d1d9]">Confirm deletion</h3>
                <button onClick={() => setdelIsOpen(false)} className="text-[#57606a] dark:text-[#8b949e] hover:text-[#24292f] dark:hover:text-[#c9d1d9]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-[#24292f] dark:text-[#c9d1d9] text-sm">
                Are you sure you want to delete this task? This action cannot be undone.
              </p>
            </div>
            <div className="bg-[#f6f8fa] dark:bg-[#0d1117] px-4 py-3 flex justify-end gap-2 border-t border-[#d0d7de] dark:border-[#30363d]">
              <button 
                onClick={() => setdelIsOpen(false)} 
                className="px-4 py-1.5 text-[#24292f] dark:text-[#c9d1d9] bg-[#f6f8fa] dark:bg-[#21262d] border border-[#d0d7de] dark:border-[#30363d] hover:bg-[#ebf0f4] dark:hover:bg-[#30363d] rounded-md text-sm font-medium transition-colors shadow-sm"
              >
                  Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                className="px-4 py-1.5 bg-[#cf222e] hover:bg-[#a40e26] text-white border border-[rgba(27,31,36,0.15)] rounded-md text-sm font-bold shadow-sm transition-all"
              >
                  Delete task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Input
