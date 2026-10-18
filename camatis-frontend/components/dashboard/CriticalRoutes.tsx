"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AlertTriangle, TrendingUp, Users, Bus } from "lucide-react";

interface CriticalRoute {
  route_id: number;
  demand_after: number;
  waiting_passengers: number;
  buses_added: number;
  frequency_multiplier: number;
  actions: string[];
  anomaly: boolean;
}

export default function CriticalRoutes({ results }: { results: CriticalRoute[] }) {
  // Find routes that need immediate attention
  const criticalRoutes = results
    .filter(r => r.waiting_passengers > 50 || r.anomaly || r.buses_added > 2)
    .sort((a, b) => b.waiting_passengers - a.waiting_passengers)
    .slice(0, 8);

  const getSeverityColor = (waiting: number) => {
    if (waiting > 100) return "bg-red-50 border-red-200 text-red-700";
    if (waiting > 50) return "bg-orange-50 border-orange-200 text-orange-700";
    return "bg-yellow-50 border-yellow-200 text-yellow-700";
  };

  const getSeverityIcon = (waiting: number) => {
    if (waiting > 100) return <AlertTriangle className="text-red-500" size={18} />;
    if (waiting > 50) return <TrendingUp className="text-orange-500" size={18} />;
    return <Users className="text-yellow-500" size={18} />;
  };

  if (criticalRoutes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Critical Routes Requiring Attention</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <p className="text-sm">✓ All routes operating normally</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <AlertTriangle className="text-orange-500" size={18} />
          Critical Routes Requiring Attention
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Routes with high waiting passengers or anomalies detected
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {criticalRoutes.map((route) => (
            <div
              key={route.route_id}
              className={`p-4 rounded-lg border-2 ${getSeverityColor(route.waiting_passengers)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getSeverityIcon(route.waiting_passengers)}
                  <div>
                    <h3 className="font-bold text-sm">Route {route.route_id}</h3>
                    <p className="text-xs opacity-80">
                      {route.anomaly && "⚠️ Anomaly Detected"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{Math.round(route.waiting_passengers)}</p>
                  <p className="text-xs opacity-80">Waiting</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-current opacity-30">
                <div>
                  <p className="text-xs opacity-80">Demand</p>
                  <p className="text-sm font-semibold">{Math.round(route.demand_after)}</p>
                </div>
                <div>
                  <p className="text-xs opacity-80">Buses Added</p>
                  <p className="text-sm font-semibold">+{route.buses_added}</p>
                </div>
                <div>
                  <p className="text-xs opacity-80">Frequency</p>
                  <p className="text-sm font-semibold">{route.frequency_multiplier.toFixed(1)}x</p>
                </div>
              </div>

              {route.actions && route.actions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-current opacity-30">
                  <p className="text-xs font-medium mb-1.5 opacity-80">Actions Taken:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {route.actions
                      .filter(a => a !== "No action")
                      .map((action, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white bg-opacity-60 rounded text-xs font-medium"
                        >
                          {action}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
