import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts';

import { useStateContext } from '../../contexts/ContextProvider';

const Stacked = ({ width, height, stackedCustomSeries }) => {
  const { currentMode } = useStateContext();

  return (
    <div

    >
 
    </div>
  );
};

export default Stacked;
