"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Bus, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function FleetStatus({ results }: { results: any[] }) {
  // Calculate fleet distribution
  const totalBusesAdded = results.reduce((sum, r) => sum + (r.buses_added || 0), 0);
  const routesWithChanges = results.filter(r => r.buses_added > 0).length;
  const routesNormal = results.filter(r => r.buses_added === 0).length;
  const routesWithAnomalies = results.filter(r => r.anomaly).length;

  const statusData = [
    { name: "Normal Operations", value: routesNormal, color: "#10b981" },
    { name: "Buses Added", value: routesWithChanges, color: "#3b82f6" },
    { name: "Anomalies", value: routesWithAnomalies, color: "#ef4444" }
  ];

  const fleetMetrics = [
    {
      label: "Total Buses Deployed",
      value: totalBusesAdded + results.length,
      icon: Bus,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      label: "Additional Buses",
      value: `+${totalBusesAdded}`,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      label: "Routes Optimized",
      value: routesWithChanges,
      icon: CheckCircle,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      label: "Issues Detected",
      value: routesWithAnomalies,
      icon: AlertCircle,
      color: "text-red-600",
      bg: "bg-red-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
      {/* Fleet Metrics */}
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Fleet Status</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Current deployment and optimization status</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {fleetMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className={`p-4 rounded-lg ${metric.bg}`}
                >
                  <div className={`mb-2 ${metric.color}`}>
                    <metric.icon size={24} />
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mb-1">
                    {metric.value}
                  </p>
                  <p className="text-xs text-slate-600">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Route Status Distribution */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Route Status Distribution</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Overview of route conditions</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ fontSize: "11px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
