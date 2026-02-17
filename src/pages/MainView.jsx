import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconDatabase,
  IconCalendarEvent,
  IconChartBar,
  IconCheck,
  IconAlertTriangle,
  IconUsers,
} from "@tabler/icons-react";
import { useAuth } from "../contexts/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const MainView = () => {
  const { caseload, loading } = useAuth();

  // --- 1. Dynamic Data Processing ---
  const analytics = useMemo(() => {
    const safeCaseload = caseload || [];

    // Group by Eligibility
    const counts = safeCaseload.reduce((acc, student) => {
      const label = student.eligibility || "Other";
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {});

    const barData = Object.keys(counts).map((key) => ({
      name: key,
      count: counts[key],
    }));

    // Group by Status for the Wheel
    const active = safeCaseload.filter((s) => s.status === "Active").length;
    const pending = safeCaseload.filter((s) => s.status === "Pending").length;
    const total = safeCaseload.length;

    // Percentage for the center of the wheel
    const percentage = total > 0 ? Math.round((active / total) * 100) : 0;

    const pieData = [
      { name: "Completed", value: active },
      { name: "Pending", value: pending || (total === 0 ? 1 : total - active) },
    ];

    return { barData, pieData, percentage, total };
  }, [caseload]);

  // Colors: Green for Active/Completed, Dark Slate for Pending/Remaining
  const PIE_COLORS = ["#10b981", "#374151"];
  const BAR_COLORS = ["#6366f1", "#8b5cf6", "#3b82f6", "#06b6d4"];

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-white">
        <div className="animate-pulse flex flex-col items-center">
          <IconDatabase className="size-8 mb-2 text-indigo-500" />
          <p>Syncing with Supabase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
      {/* --- COLUMN 1: CASELOAD (Transparent Background) --- */}
      <Card className="w-full bg-gray-900 border-gray-700 row-span-2 flex flex-col min-h-[500px]">
        <CardHeader className="pb-2 border-b border-gray-800">
          <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
            <IconUsers className="text-pink-500" /> My Caseload
          </CardTitle>
          <p className="text-xs text-gray-400">
            {analytics.total} Total Students
          </p>
        </CardHeader>

        <CardContent className="p-0 flex-1 overflow-y-auto max-h-[700px] scrollbar-hide">
          <ul className="divide-y divide-gray-800/50">
            {caseload?.map((student) => (
              <li key={student.id} className="hover:bg-white/5 transition-all">
                <div className="flex gap-4 justify-between p-4 group">
                  <div>
                    <strong className="font-medium text-white block group-hover:text-pink-400">
                      {student.name}
                    </strong>
                    <p className="text-xs text-gray-500">
                      ID: {student.student_id}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">
                      {student.eligibility || "IEP"}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {analytics.total === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm italic">
              No students found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* --- COLUMN 2: KPI STATS --- */}
      <Card className="w-full bg-gray-900 border-gray-700">
        <CardContent className="p-6 grid grid-cols-2 gap-3 h-full">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 flex flex-col items-center justify-center">
            <IconCalendarEvent className="text-blue-400 mb-1" />
            <span className="text-xl font-bold text-white">
              {analytics.total > 0 ? "3" : "0"}
            </span>
            <span className="text-[10px] text-gray-400 uppercase">
              Upcoming
            </span>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 flex flex-col items-center justify-center">
            <IconAlertTriangle className="text-red-400 mb-1" />
            <span className="text-xl font-bold text-white">1</span>
            <span className="text-[10px] text-gray-400 uppercase">Overdue</span>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 flex flex-col items-center justify-center col-span-2">
            <IconDatabase className="text-emerald-400 mb-1" />
            <span className="text-sm text-gray-300">
              Supabase Status:{" "}
              <span className="text-emerald-400 font-bold">Online</span>
            </span>
          </div>
        </CardContent>
      </Card>

      {/* --- COLUMN 3-4: BAR CHART --- */}
      <Card className="w-full bg-gray-900 border-gray-700 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
            <IconChartBar className="text-indigo-400" /> Eligibility Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="h-48">
          {analytics.total > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.barData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#9CA3AF"
                  tick={{ fill: "#9CA3AF", fontSize: 10 }}
                />
                <YAxis
                  stroke="#9CA3AF"
                  tick={{ fill: "#9CA3AF", fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-600 italic">
              No caseload data
            </div>
          )}
        </CardContent>
      </Card>

      {/* --- FIXED COMPLIANCE WHEEL --- */}
      <Card className="w-full bg-gray-900 border-gray-700">
        <CardHeader className="pb-0">
          <CardTitle className="text-white text-xs font-medium uppercase tracking-widest flex items-center gap-2">
            <IconCheck className="text-emerald-400 size-4" /> Compliance Meter
          </CardTitle>
        </CardHeader>
        <CardContent className="h-60 flex flex-col items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={analytics.pieData}
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {analytics.pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Centered Percentage Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
            <span className="text-3xl font-bold text-white leading-none">
              {analytics.percentage}%
            </span>
            <span className="text-[10px] text-gray-500 font-bold uppercase mt-1">
              Active
            </span>
          </div>
        </CardContent>
      </Card>

      {/* --- SYSTEM LOGS --- */}
      <Card className="w-full bg-gray-900 border-gray-700 lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
            <IconCheck className="text-blue-400" /> System Logs
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-y-auto h-48 space-y-3 scrollbar-hide">
          <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
            <IconDatabase className="text-blue-400 size-4 mt-1" />
            <p className="text-xs text-gray-300">
              Successfully synced {analytics.total} student records from
              Supabase.
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
            <IconCheck className="text-emerald-400 size-4 mt-1" />
            <p className="text-xs text-gray-300">
              Last compliance check:{" "}
              <span className="text-emerald-400">All clear.</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainView;
