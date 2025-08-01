import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../WidgetBase';

interface BoxPlotWidgetProps {
  data: {
    title: string;
    categories: string[];
    values: number[][];
  };
  id: string;
  refresh?: () => void;
  onReference?: (widgetId: string) => void;
}

const BoxPlotWidget: React.FC<BoxPlotWidgetProps> = ({ data, id, refresh, onReference }) => {
  const options = {
    xAxis: {
      type: 'category',
      data: data.categories
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'boxplot',
      data: data.values
    }]
  };

  return (
    <WidgetBase title={data.title} widgetId={id} refresh={refresh} onReference={onReference}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default BoxPlotWidget;
