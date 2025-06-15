import { useEffect, useState } from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  Line,
  CartesianGrid
} from "recharts";
import { allCoursesPost } from "api/allCoursePost";

type TChartData = {
  date: number;
  open_course: string;
  min_course: string;
  max_course: string;
  close_course: string;
};

type TRechartsItem = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

export const ChartHistory = ({ currency }: { currency: string }) => {
  const [data, setData] = useState<TRechartsItem[]>([]);
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historyData: TChartData[] = await allCoursesPost(currency);
        
        const prepared: TRechartsItem[] = historyData.map((item) => {
          const date = item.date.toString().split("T")[0];
          return {
            date,
            open: parseFloat(item.open_course),
            high: parseFloat(item.max_course),
            low: parseFloat(item.min_course),
            close: parseFloat(item.close_course),
          };
        });
        setData(prepared);
      } catch (err) {
        console.error("Ошибка при загрузке истории:", err);
      }
    };
    fetchHistory();
  }, [currency]);

  return (
    <div>
      <h3 className="text-secondary mb-2">История курса {currency}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: "#808080" }} />
          <YAxis domain={["dataMin", "dataMax"]} tick={{ fill: "#808080" }} />
          <Tooltip />
          {/* Свеча в виде отрезка min -> max */}
          <Bar dataKey="high" fill="transparent" stroke="yellow" />
          <Bar dataKey="low" fill="transparent" stroke="#3dd15a" />
          {/* Линия закрытия или можно добавить Line для close */}
          <Line dataKey="close" stroke="red" dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
