"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Brain, Users, Bus, Calendar, AlertTriangle, TrendingUp, Clock } from "lucide-react";

export default function AgentDecisions() {
  const agents = [
    {
      name: "Demand Agent",
      icon: Users,
      color: "bg-blue-500",
      decisions: 127,
      description: "Predicts passenger demand patterns"
    },
    {
      name: "Fleet Agent",
      icon: Bus,
      color: "bg-green-500",
      decisions: 42,
      description: "Allocates buses to routes"
    },
    {
      name: "Scheduling Agent",
      icon: Calendar,
      color: "bg-purple-500",
      decisions: 89,
      description: "Optimizes frequency multipliers"
    },
    {
      name: "Supervisor Agent",
      icon: Brain,
      color: "bg-indigo-500",
      decisions: 269,
      description: "Coordinates all agent decisions"
    },
    {
      name: "Anomaly Agent",
      icon: AlertTriangle,
      color: "bg-red-500",
      decisions: 65,
      description: "Detects irregular patterns"
    },
    {
      name: "Optimization Agent",
      icon: TrendingUp,
      color: "bg-orange-500",
      decisions: 127,
      description: "Multi-objective optimization (NSGA3)"
    }
  ];

  const pipelineTime = "2.3s";
  const lastRun = "5 mins ago";

  return (
    <div className="space-y-4">
      {/* Pipeline Performance */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 text-white rounded-lg">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-900">
                  Last Pipeline Execution
                </p>
                <p className="text-xs text-blue-700">
                  {lastRun} • Completed in {pipelineTime} • 269 routes analyzed
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">{pipelineTime}</p>
                <p className="text-xs text-blue-600">Execution Time</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">✓</p>
                <p className="text-xs text-green-600">Success</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Decisions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Brain size={18} className="text-indigo-600" />
            9-Agent System Decisions
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            AI agents working together to optimize transit operations
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {agents.map((agent, idx) => (
              <div
                key={idx}
                className="p-4 border-2 border-slate-200 rounded-lg hover:border-slate-300 transition-all hover:shadow-md"
                title={agent.description}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 ${agent.color} text-white rounded-lg`}>
                    <agent.icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 mb-1">
                      {agent.name}
                    </p>
                    <p className="text-xs text-slate-600 mb-2 line-clamp-2">
                      {agent.description}
                    </p>
                    <p className="text-lg font-bold text-indigo-600">
                      {agent.decisions}
                    </p>
                    <p className="text-xs text-slate-500">decisions made</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <p className="text-xs text-indigo-700">
              <span className="font-semibold">How it works:</span> Each agent specializes in one aspect of transit optimization. 
              The Supervisor Agent coordinates all decisions, while the Optimization Agent uses NSGA3 
              multi-objective evolutionary algorithm to find the best overall solution.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
