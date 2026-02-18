import React, { useState } from 'react';


function Input() {
    const [task, setTask] = useState(["sam","sam2"]);


    const handleSub = (e) => {
        const input = document.getElementById("txt").value;
        document.getElementById("txt").value = ""
        setTask(t=>([...task, input]));
        e.preventDefault();
  
    }

        function handleDelete(index){
            setTask(task.filter((_,i) => i !== index))
            
        }

          function handleEdit(index){

        }


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


  {task.map((tsk, index) => (
  <div 
    key={index} 
    className="mt-4 p-4 w-full max-w-md bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-between group hover:border-blue-300 transition-colors"
  >
    {/* Left Side: Task Content */}
    <div className="flex items-center overflow-hidden">
      <span className="text-blue-400 mr-3 flex-shrink-0">●</span>
      <p className="text-gray-700 font-medium truncate">
        {tsk}
      </p>
    </div>

    {/* Right Side: Action Buttons */}
    <div className="flex gap-1 ml-4 flex-shrink-0">
      {/* Edit Button */}
      <button 
        onClick={()=>handleEdit(index)}
        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
        title="Edit Task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>

      {/* Delete Button */}
      <button 
        onClick={()=>handleDelete(index)}
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

</div>
 
    );
       
}

export default Input
