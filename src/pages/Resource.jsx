import React from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import ResourceBox from '../components/ResourceBox'
import { earningData, medicalproBranding, recentTransactions, resourceReports, dropdownData, SparklineAreaData, ecomPieChartData, resources } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { DragDropContext,Droppable } from 'react-beautiful-dnd';
const Resource = () => {
  const { currentColor, currentMode } = useStateContext();

  return (
    <div className="mt-24">
      hi
    </div>
  );
};

export default Resource;