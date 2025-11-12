import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { CalendarDays, BarChart3 } from "lucide-react"; // 📦 Icons

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const initialData = [
  { date: "2025-11-01", sales: 400, profit: 240 },
  { date: "2025-11-02", sales: 300, profit: 221 },
  { date: "2025-11-03", sales: 500, profit: 229 },
  { date: "2025-11-04", sales: 278, profit: 200 },
  { date: "2025-11-05", sales: 189, profit: 218 },
  { date: "2025-11-06", sales: 239, profit: 250 },
  { date: "2025-11-07", sales: 349, profit: 210 },
];

export default function ChartWidget() {
  const [chartType, setChartType] = useState("Bar");
  const [startDate, setStartDate] = useState("2025-11-01");
  const [endDate, setEndDate] = useState("2025-11-07");

  // Filter data by selected date range
  const filteredData = useMemo(() => {
    return initialData.filter(
      (item) => item.date >= startDate && item.date <= endDate
    );
  }, [startDate, endDate]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 p-2 rounded shadow">
          <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
            <CalendarDays className="w-4 h-4 text-blue-500" /> {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs text-gray-600">
              {entry.name}: <span className="font-semibold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Chart renderer
  const renderChart = () => {
    switch (chartType) {
      case "Line":
        return (
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#3b82f6" />
            <Line type="monotone" dataKey="profit" stroke="#10b981" />
          </LineChart>
        );
      case "Pie":
        return (
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Pie
              data={filteredData}
              dataKey="sales"
              nameKey="date"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {filteredData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        );
      default:
        return (
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="sales" fill="#3b82f6" />
            <Bar dataKey="profit" fill="#10b981" />
          </BarChart>
        );
    }
  };

  return (
    <div className="rounded-2xl shadow p-6 bg-white">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        Chart Widget
      </h2>

   
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-sm text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-2 py-1 text-sm focus:ring focus:ring-blue-200 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-2 py-1 text-sm focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700">Chart Type</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="border rounded px-2 py-1 text-sm focus:ring focus:ring-blue-200 outline-none"
          >
            <option value="Bar">Bar</option>
            <option value="Line">Line</option>
            <option value="Pie">Pie</option>
          </select>
        </div>
      </div>

      {/* Chart Container */}
      <div className="w-full h-[350px]">
        <ResponsiveContainer className="w-full h-full">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
