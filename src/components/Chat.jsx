import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const Chat = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="nav-item absolute right-5 md:right-52 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      
    </div>
  );
};

export default Chat;
