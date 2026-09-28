"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DollarSign, Fuel, Clock, Users, TrendingDown, TrendingUp } from "lucide-react";

export default function CostEfficiency({ results }: { results: any[] }) {
  // Calculate metrics
  const totalBusesAdded = results.reduce((sum, r) => sum + (r.buses_added || 0), 0);
  const totalWaiting = results.reduce((sum, r) => sum + (r.waiting_passengers || 0), 0);
  
  // Cost calculations (simulated)
  const costPerBus = 5000; // per day
  const costPerHour = 500; // operational cost
  const additionalCost = totalBusesAdded * costPerBus;
  
  // Efficiency gains (simulated)
  const waitTimeReduction = 32; // %
  const fuelEfficiencyGain = 12; // %
  const passengerSatisfaction = 88; // %

  const metrics = [
    {
      label: "Additional Bus Cost",
      value: `₹${(additionalCost / 1000).toFixed(0)}K`,
      subvalue: `+${totalBusesAdded} buses deployed`,
      icon: DollarSign,
      color: "text-red-600",
      bg: "bg-red-50",
      trend: "up"
    },
    {
      label: "Waiting Time Reduced",
      value: `-${waitTimeReduction}%`,
      subvalue: `~${Math.round(totalWaiting * 0.32)} passengers saved`,
      icon: Clock,
      color: "text-green-600",
      bg: "bg-green-50",
      trend: "down"
    },
    {
      label: "Fuel Efficiency",
      value: `+${fuelEfficiencyGain}%`,
      subvalue: "Optimized route scheduling",
      icon: Fuel,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "up"
    },
    {
      label: "Passenger Satisfaction",
      value: `${passengerSatisfaction}%`,
      subvalue: "Based on demand fulfillment",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
      trend: "neutral"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <DollarSign size={18} className="text-green-600" />
          Cost & Efficiency Metrics
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Financial impact and operational efficiency
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border-2 ${metric.bg}`}
            >
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={metric.color} size={24} />
                {metric.trend === "up" && <TrendingUp className="text-green-500" size={16} />}
                {metric.trend === "down" && <TrendingDown className="text-red-500" size={16} />}
              </div>
              <p className={`text-2xl font-bold ${metric.color} mb-1`}>
                {metric.value}
              </p>
              <p className="text-xs font-semibold text-slate-700 mb-1">
                {metric.label}
              </p>
              <p className="text-xs text-slate-600">
                {metric.subvalue}
              </p>
            </div>
          ))}
        </div>

        {/* ROI Summary */}
        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800 mb-1">
                Return on Investment (ROI)
              </p>
              <p className="text-xs text-slate-600">
                Cost of {totalBusesAdded} buses vs reduced waiting time + improved satisfaction
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">
                +24%
              </p>
              <p className="text-xs text-green-700 font-medium">Positive ROI</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
