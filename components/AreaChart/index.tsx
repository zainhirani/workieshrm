import React from "react";
import Typography from "@mui/material/Typography";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface chartProps {
  [key: string]: string | number;
}

interface chartKeyProps {
  id: string;
  name: string;
  color: string;
  dot: string;
}

interface IAreaChartProps {
  chart: chartProps[];
  chartKeys: chartKeyProps[];
  legend: boolean;
  tooltip: boolean;
}

const CustomAreaChart: React.FC<IAreaChartProps> = ({
  chart,
  chartKeys,
  legend,
  tooltip,
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        width={730}
        height={250}
        data={chart}
        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
      >
        {legend && (
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            iconType="circle"
            formatter={(value, entry, index) => (
              <Typography
                variant="subtitle1"
                component="span"
                sx={{ color: (theme) => theme.palette.primary.dark }}
              >
                {value[0].toUpperCase() + value.substring(1)}
              </Typography>
            )}
            wrapperStyle={{
              paddingBottom: "20px",
            }}
          />
        )}
        <defs>
          {chartKeys.map((key, index) => (
            <linearGradient key={index} id={key.id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={key.color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={key.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        {tooltip && <Tooltip />}

        {chartKeys.map((key, index) => (
          <Area
            key={index}
            type="monotone"
            dataKey={key.name}
            stroke={key.color}
            fillOpacity={1}
            fill={`url(#${key.id})`}
            dot={{
              stroke: key.dot,
              strokeWidth: 1,
              r: 4,
              strokeDasharray: "",
            }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomAreaChart;
