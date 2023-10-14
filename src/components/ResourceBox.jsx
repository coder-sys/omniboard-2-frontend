import React from 'react';
import { FaTrash } from 'react-icons/fa';
const ResourceBox = ({ folderdata }) => (
    <div draggable className="flex flex-wrap justify-center">
    <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
      
      <div className="flex justify-between">
        
      </div>
      <button type="button" style={{'marginRight':'80px'}} className="text-xl font-semibold text-gray-500">
      <FaTrash />
        </button>
      <div className="mt-10 ">
        {folderdata.map((item,index) => (
          <div key={item.title} className="flex justify-between mt-8 w-full" draggable >
            
            <p className="text-md ">{item.title} <br></br><br></br><p style={{"fontSize":'10px'}}>{item.discription} </p> </p>
          </div>
        ))}
        <div className="mt-4">
            [image]
        </div>
      </div>

    </div>
    
  
  </div>
);

export default ResourceBox;