import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

import useWebSocket from "hooks/useWebSocket";
import { WS_ONE_URL } from "config";

type TChartData = {
  course: string;
  created_at: string;
};

function formatChartData(data: TChartData[]) {
  return data.map(item => ({
    time: new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    price: +item.course,
  }));
}

export const ChartDynamic = (props: { currency: string }) => {
  const [chartData, setChartData] = useState<TChartData[]>([]);

  useWebSocket(`${WS_ONE_URL}?curr=${props.currency}`, (data: TChartData[] | TChartData) => {
    if (Array.isArray(data)) {
      setChartData(data);
    } else {
      setChartData(prev => [...prev, data]);
    }
  });

  const formattedData = formatChartData(chartData);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h3 className="text-lg font-semibold mb-2 text-center">
        Dynamic course of {props.currency} for day
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis dataKey="price" tickFormatter={(v) => `$${v}`} />
          <Tooltip
            formatter={(value: number) => `$${value.toFixed(2)}`}
            labelFormatter={(label: string) => `Time: ${label}`}
          />
          <Line type="monotone" dataKey="price" stroke="#ff4d4f" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
