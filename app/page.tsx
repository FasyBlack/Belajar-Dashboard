"use strict";
"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, CheckCircle2 } from "lucide-react"
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Data Tiruan Distribusi Stack
const stackData = [
  { name: "Next.js & React", value: 45, color: "#3f3f46" }, // zinc-700
  { name: "Laravel & PHP", value: 25, color: "#ef4444" },   // red-500
  { name: "Flutter & Dart", value: 20, color: "#3b82f6" },  // blue-500
  { name: "PostgreSQL", value: 10, color: "#10b981" },      // emerald-500
]

// Data Tiruan Tren Kontribusi
const commitData = [
  { month: "Jan", commits: 45 },
  { month: "Feb", commits: 80 },
  { month: "Mar", commits: 65 },
  { month: "Apr", commits: 110 },
  { month: "Mei", commits: 90 },
  { month: "Jun", commits: 155 },
]

export default function Home() {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Project Overview</h1>
            <p className="text-muted-foreground">Pantau progres proyek dan alokasi waktumu bulan ini.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* KOLOM KIRI (Project Summary) */}
            <Card className="col-span-1 bg-zinc-900 text-zinc-50 border-none shadow-lg flex flex-col">
              <CardHeader className="pb-4">
                <CardDescription className="text-zinc-400">Total Proyek Aktif</CardDescription>
                <CardTitle className="text-5xl font-bold">12</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-300">Target Penyelesaian (Q3)</span>
                      <span className="font-medium text-white">75%</span>
                    </div>
                    <Progress value={75} className="h-2 bg-zinc-700" />
                  </div>

                  <div className="pt-4 border-t border-zinc-800 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-zinc-800 rounded-full text-blue-400">
                        <Briefcase size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Proyek Baru</p>
                        <p className="text-xs text-zinc-400">Bulan ini</p>
                      </div>
                      <span className="font-semibold">+3</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-zinc-800 rounded-full text-emerald-400">
                        <CheckCircle2 size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Selesai</p>
                        <p className="text-xs text-zinc-400">Telah rilis</p>
                      </div>
                      <span className="font-semibold">8</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KOLOM KANAN (Visualisasi Recharts) */}
            <div className="col-span-1 lg:col-span-2 space-y-6 flex flex-col">
              
              {/* Donut Chart */}
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Distribusi Tech Stack</CardTitle>
                  <CardDescription>Alokasi framework dalam proyek aktif</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stackData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {stackData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Line Chart */}
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Tren Kontribusi (Commits)</CardTitle>
                </CardHeader>
                <CardContent className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={commitData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#71717a', fontSize: 12 }} 
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#71717a', fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="commits" 
                        stroke="#18181b" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: "#18181b" }} 
                        activeDot={{ r: 6 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}