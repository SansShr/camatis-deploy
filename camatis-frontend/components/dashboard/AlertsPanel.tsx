import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AlertTriangle, Info, XCircle, Clock } from "lucide-react";

interface Alert {
  id: number;
  route: string;
  message: string;
  severity: string;
  time: string;
}

const severityConfig: Record<string, { icon: typeof XCircle; color: string; bg: string; border: string }> = {
  High: { icon: XCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
  Medium: { icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" },
  Low: { icon: Info, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
};

export default function AlertsPanel({ alerts }: { alerts: Alert[] }) {
  if (!alerts || alerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Clock size={18} className="text-slate-500" />
            Recent Alerts
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">System notifications and warnings</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8 text-center">
            <div>
              <Info className="text-slate-300 mx-auto mb-2" size={32} />
              <p className="text-sm text-muted-foreground">No active alerts</p>
              <p className="text-xs text-slate-400 mt-1">System operating normally</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Group by severity
  const highSeverity = alerts.filter(a => a.severity === "High");
  const mediumSeverity = alerts.filter(a => a.severity === "Medium");
  const lowSeverity = alerts.filter(a => a.severity === "Low");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Clock size={18} className="text-slate-600" />
            Recent Alerts
          </span>
          <div className="flex items-center gap-2 text-xs">
            {highSeverity.length > 0 && (
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                {highSeverity.length} Critical
              </span>
            )}
            {mediumSeverity.length > 0 && (
              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                {mediumSeverity.length} Warning
              </span>
            )}
          </div>
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">System notifications and operational warnings</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
          {alerts.slice(0, 10).map((alert) => {
            const cfg = severityConfig[alert.severity] ?? severityConfig.Low;
            const Icon = cfg.icon;
            return (
              <div 
                key={alert.id} 
                className={`flex items-start gap-3 p-3.5 rounded-lg border ${cfg.bg} ${cfg.border}`}
              >
                <div className={`p-1.5 rounded ${cfg.color}`}>
                  <Icon size={16} className="shrink-0" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-xs text-slate-700">Route {alert.route}</p>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${cfg.bg} ${cfg.color}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-snug mb-1">{alert.message}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock size={11} />
                    {alert.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {alerts.length > 10 && (
          <div className="mt-3 pt-3 border-t border-slate-200 text-center">
            <p className="text-xs text-muted-foreground">
              Showing 10 of {alerts.length} alerts
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}