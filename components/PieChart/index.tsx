import React from 'react';
import ReactEcharts from 'echarts-for-react';

interface PieChartProps{data:Object,id:string};

const PieChart = ({ data,id }:PieChartProps) => {
  const { title, totalOnline, total, percentage } = parseData(data);
  const color = percentage === '100%' ? '#ACD59A' : '#FF5C5C';
  const lightRed = '#FFC3C3';

  const option = {
    title: {
            text: `${percentage} `,
            left: 'center',
            top: 'center',
          },
    series: [
      {
        type: 'pie',
        radius: ['100%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
            fontSize: '20',
            fontWeight: 'bold',
          },
        },
        data: [
          {
            value: percentage?.replace("%",""),
            name: 'Online',
            itemStyle: {
              color,
            },
          },
          {
            value: 100 - Number(percentage?.replace("%","")),
            name: 'Offline',
            itemStyle: {
              color: lightRed,
            },
          },
        ],
      },
    ],
  };

  return <div id={id}><ReactEcharts option={option} style={{ height: '200px', width: '100%',display:"flex",justifyContent:"center"}} /></div>;
};

const parseData = (data:any) => {
  let title, totalOnline, total, percentage;

  for (const key in data) {
    if (key.toLowerCase().startsWith('total') && !key.toLowerCase().includes('online') && !key.toLowerCase().includes('offline')) {
      total = data[key];
    } else if (key.toLowerCase().includes('online')) {
      totalOnline = data[key];
    } else if (key.toLowerCase().includes('percentage')) {
      percentage = data[key];
    }
  }

  title = data.title || 'Untitled';

  return { title, totalOnline, total, percentage };
};

export default PieChart;