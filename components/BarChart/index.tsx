import React from "react";
import Typography from "@mui/material/Typography";
import {
  Bar,
  BarChart,
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
  name: string;
  color: string;
}

interface IBarChartProps {
  chart: chartProps[];
  chartKeys: chartKeyProps[];
  legend: boolean;
  tooltip: boolean;
}

const CustomBarChart: React.FC<IBarChartProps> = ({
  chart,
  chartKeys,
  legend,
  tooltip,
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
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
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />

        {tooltip && <Tooltip />}

        {chartKeys.map((key, index) => (
          <Bar key={index} dataKey={key.name} fill={key.color} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
