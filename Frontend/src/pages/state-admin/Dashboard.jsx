import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Building2,
  Layers,
  MapPin,
  Users,
  Store,
  CalendarCheck,
  Briefcase,
  Wrench,
  UserPlus,
  IndianRupee,
  ChevronDown,
  RefreshCw
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export function StateAdminDashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();

  // Revenue chart data (01 May -> 31 May)
  const revenueChartData = [
    { date: '01 May', value: 16000 },
    { date: '', value: 24000 },
    { date: '08 May', value: 24500 },
    { date: '', value: 38000 },
    { date: '15 May', value: 37000 },
    { date: '', value: 48000 },
    { date: '22 May', value: 39000 },
    { date: '', value: 43000 },
    { date: '31 May', value: 50000 },
  ];

  // Orders bar chart data
  const ordersChartData = [
    { date: '01 May', orders: 28000 },
    { date: '', orders: 35000 },
    { date: '08 May', orders: 18000 },
    { date: '', orders: 17000 },
    { date: '15 May', orders: 34000 },
    { date: '', orders: 6000 },
    { date: '22 May', orders: 24000 },
    { date: '', orders: 49000 },
    { date: '', orders: 10000 },
    { date: '31 May', orders: 30000 },
  ];

  // Donut data for Status Overview
  const donutData = [
    { name: 'Active', value: 92, color: '#10b981' },
    { name: 'Inactive', value: 5, color: '#f59e0b' },
    { name: 'Pending', value: 3, color: '#d97706' }
  ];

  const cardBaseStyle = isDark
    ? 'bg-[#131f37] border-[#1f3358]'
    : 'bg-white border-slate-200/90 shadow-sm';

  return (
    <div className="space-y-6 pb-8">
      {/* Row 1: Top 4 Main Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Districts */}
        <div className={`admin-card p-5 flex items-center gap-4 ${cardBaseStyle} border transition-colors`}>
          <div className={`p-3 rounded-2xl ${
            isDark ? 'bg-blue-950/60 text-blue-400 border-blue-900/50' : 'bg-blue-50 text-blue-600 border-blue-100'
          } border`}>
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Districts</div>
            <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mt-0.5`}>32</div>
            <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-0.5">+4 New</div>
          </div>
        </div>

        {/* Total Divisions */}
        <div className={`admin-card p-5 flex items-center gap-4 ${cardBaseStyle} border transition-colors`}>
          <div className={`p-3 rounded-2xl ${
            isDark ? 'bg-cyan-950/60 text-cyan-400 border-cyan-900/50' : 'bg-cyan-50 text-cyan-600 border-cyan-100'
          } border`}>
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Divisions</div>
            <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mt-0.5`}>128</div>
            <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">+12 New</div>
          </div>
        </div>

        {/* Total Pincodes */}
        <div className={`admin-card p-5 flex items-center gap-4 ${cardBaseStyle} border transition-colors`}>
          <div className={`p-3 rounded-2xl ${
            isDark ? 'bg-indigo-950/60 text-indigo-400 border-indigo-900/50' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
          } border`}>
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <div className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Pincodes</div>
            <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mt-0.5`}>1,256</div>
            <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">+38 New</div>
          </div>
        </div>

        {/* Total Customers */}
        <div className={`admin-card p-5 flex items-center gap-4 ${cardBaseStyle} border transition-colors`}>
          <div className={`p-3 rounded-2xl ${
            isDark ? 'bg-sky-950/60 text-sky-400 border-sky-900/50' : 'bg-sky-50 text-sky-600 border-sky-100'
          } border`}>
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Customers</div>
            <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mt-0.5`}>12,845</div>
            <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-0.5">+256 New</div>
          </div>
        </div>
      </div>

      {/* Row 2: Revenue Overview (Area) & Orders Overview (Bar) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Revenue Overview */}
        <div className={`admin-card p-5 ${cardBaseStyle} border flex flex-col justify-between transition-colors`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Revenue Overview</span>
            <div className={`flex items-center gap-1 text-[11px] font-semibold ${
              isDark ? 'text-slate-300 bg-slate-800/80 border-slate-700' : 'text-slate-600 bg-slate-100 border-slate-200'
            } px-2.5 py-1 rounded-lg cursor-pointer border`}>
              <span>This Month</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-2.5 mt-2 mb-4">
            <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>₹24,58,320</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              isDark ? 'text-emerald-400 bg-emerald-950/50 border-emerald-800' : 'text-emerald-700 bg-emerald-50 border-emerald-200'
            } border`}>
              +18.6%
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={isDark ? 0.35 : 0.18} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={10} tickLine={false} />
                <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={10} tickLine={false} tickFormatter={(v) => (v === 0 ? '0' : `${v / 1000}K`)} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    borderColor: isDark ? '#334155' : '#cbd5e1',
                    borderRadius: '10px',
                    fontSize: '11px',
                    color: isDark ? '#ffffff' : '#0f172a',
                    boxShadow: isDark ? '0 10px 15px -3px rgba(0,0,0,0.5)' : '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                  dot={{ r: 3.5, fill: '#2563eb', stroke: isDark ? '#131f37' : '#ffffff', strokeWidth: 1.5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Orders Overview */}
        <div className={`admin-card p-5 ${cardBaseStyle} border flex flex-col justify-between transition-colors`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Orders Overview</span>
            <div className={`flex items-center gap-1 text-[11px] font-semibold ${
              isDark ? 'text-slate-300 bg-slate-800/80 border-slate-700' : 'text-slate-600 bg-slate-100 border-slate-200'
            } px-2.5 py-1 rounded-lg cursor-pointer border`}>
              <span>This Month</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-2.5 mt-2 mb-4">
            <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>8,452</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              isDark ? 'text-emerald-400 bg-emerald-950/50 border-emerald-800' : 'text-emerald-700 bg-emerald-50 border-emerald-200'
            } border`}>
              +14.2%
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="date" stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={10} tickLine={false} />
                <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={10} tickLine={false} tickFormatter={(v) => (v === 0 ? '0' : `${v / 1000}K`)} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    borderColor: isDark ? '#334155' : '#cbd5e1',
                    borderRadius: '10px',
                    fontSize: '11px',
                    color: isDark ? '#ffffff' : '#0f172a',
                    boxShadow: isDark ? '0 10px 15px -3px rgba(0,0,0,0.5)' : '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="orders" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: State Summary Mini Cards */}
      <div className={`admin-card p-5 ${cardBaseStyle} border space-y-3 transition-colors`}>
        <h3 className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>State Summary</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* 1. Total Vendors */}
          <div className={`p-3.5 rounded-xl ${
            isDark ? 'bg-[#0f1a30] border-slate-800' : 'bg-slate-50 border-slate-200/80'
          } border flex flex-col justify-between transition-colors`}>
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${isDark ? 'bg-blue-950 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                <Store className="w-3.5 h-3.5" />
              </div>
              <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Vendors</span>
            </div>
            <div className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'} my-1`}>2,345</div>
            <svg className="w-full h-5 stroke-blue-500 fill-none" viewBox="0 0 100 25">
              <path d="M0,18 Q20,5 40,15 T80,10 T100,12" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* 2. Total Bookings */}
          <div className={`p-3.5 rounded-xl ${
            isDark ? 'bg-[#0f1a30] border-slate-800' : 'bg-slate-50 border-slate-200/80'
          } border flex flex-col justify-between transition-colors`}>
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${isDark ? 'bg-blue-950 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                <CalendarCheck className="w-3.5 h-3.5" />
              </div>
              <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Bookings</span>
            </div>
            <div className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'} my-1`}>3,276</div>
            <svg className="w-full h-5 stroke-blue-500 fill-none" viewBox="0 0 100 25">
              <path d="M0,15 Q25,8 50,18 T75,6 T100,14" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* 3. Total Jobs */}
          <div className={`p-3.5 rounded-xl ${
            isDark ? 'bg-[#0f1a30] border-slate-800' : 'bg-slate-50 border-slate-200/80'
          } border flex flex-col justify-between transition-colors`}>
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${isDark ? 'bg-purple-950 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                <Briefcase className="w-3.5 h-3.5" />
              </div>
              <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Jobs</span>
            </div>
            <div className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'} my-1`}>1,842</div>
            <svg className="w-full h-5 stroke-purple-500 fill-none" viewBox="0 0 100 25">
              <path d="M0,20 Q20,10 45,15 T75,8 T100,16" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* 4. Total Technicians */}
          <div className={`p-3.5 rounded-xl ${
            isDark ? 'bg-[#0f1a30] border-slate-800' : 'bg-slate-50 border-slate-200/80'
          } border flex flex-col justify-between transition-colors`}>
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${isDark ? 'bg-blue-950 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                <Wrench className="w-3.5 h-3.5" />
              </div>
              <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Technicians</span>
            </div>
            <div className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'} my-1`}>932</div>
            <svg className="w-full h-5 stroke-blue-500 fill-none" viewBox="0 0 100 25">
              <path d="M0,18 Q30,6 60,16 T100,10" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* 5. Total Agents */}
          <div className={`p-3.5 rounded-xl ${
            isDark ? 'bg-[#0f1a30] border-slate-800' : 'bg-slate-50 border-slate-200/80'
          } border flex flex-col justify-between transition-colors`}>
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${isDark ? 'bg-purple-950 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                <UserPlus className="w-3.5 h-3.5" />
              </div>
              <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Agents</span>
            </div>
            <div className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'} my-1`}>1,256</div>
            <svg className="w-full h-5 stroke-purple-500 fill-none" viewBox="0 0 100 25">
              <path d="M0,14 Q25,20 50,10 T80,18 T100,12" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* 6. Payments (Today) */}
          <div className={`p-3.5 rounded-xl ${
            isDark ? 'bg-[#0f1a30] border-slate-800' : 'bg-slate-50 border-slate-200/80'
          } border flex flex-col justify-between transition-colors`}>
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${isDark ? 'bg-purple-950 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                <IndianRupee className="w-3.5 h-3.5" />
              </div>
              <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'} truncate`}>Payments (Today)</span>
            </div>
            <div className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'} my-1`}>₹98,765</div>
            <svg className="w-full h-5 stroke-purple-500 fill-none" viewBox="0 0 100 25">
              <path d="M0,16 Q20,8 50,15 T80,7 T100,14" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Row 4: Bottom 3 Columns (Top Districts, Recent Activities, Status Overview) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Column 1: Top Districts by Revenue */}
        <div className={`admin-card p-5 ${cardBaseStyle} border flex flex-col justify-between transition-colors`}>
          <div>
            <h4 className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} mb-3`}>Top Districts by Revenue</h4>
            <div className="space-y-3">
              <div className={`flex items-center justify-between text-xs pb-2 border-b ${
                isDark ? 'border-slate-800/80' : 'border-slate-100'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>1</span>
                  <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Chennai</span>
                </div>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>₹4,85,760</span>
              </div>
              <div className={`flex items-center justify-between text-xs pb-2 border-b ${
                isDark ? 'border-slate-800/80' : 'border-slate-100'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>2</span>
                  <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Coimbatore</span>
                </div>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>₹3,25,410</span>
              </div>
              <div className={`flex items-center justify-between text-xs pb-2 border-b ${
                isDark ? 'border-slate-800/80' : 'border-slate-100'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>3</span>
                  <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Madurai</span>
                </div>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>₹2,65,890</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>4</span>
                  <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Tiruchirappalli</span>
                </div>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>₹2,10,340</span>
              </div>
            </div>
          </div>
          <div className={`text-right pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'} mt-4`}>
            <span className={`text-[11px] font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'} hover:underline cursor-pointer`}>
              View All
            </span>
          </div>
        </div>

        {/* Column 2: Recent Activities */}
        <div className={`admin-card p-5 ${cardBaseStyle} border flex flex-col justify-between transition-colors`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Recent Activities</h4>
              <RefreshCw className={`w-3.5 h-3.5 ${isDark ? 'text-blue-400' : 'text-blue-600'} cursor-pointer hover:rotate-180 transition-transform duration-300`} />
            </div>
            <div className="space-y-3 text-xs">
              <div className={`flex items-start justify-between gap-2 pb-2 border-b ${
                isDark ? 'border-slate-800/80' : 'border-slate-100'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">▲</span>
                  <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>New District added - Chengalpattu</span>
                </div>
                <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'} whitespace-nowrap`}>2 mins ago</span>
              </div>
              <div className={`flex items-start justify-between gap-2 pb-2 border-b ${
                isDark ? 'border-slate-800/80' : 'border-slate-100'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="text-purple-600">📊</span>
                  <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Division updated in Coimbatore</span>
                </div>
                <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'} whitespace-nowrap`}>15 mins ago</span>
              </div>
              <div className={`flex items-start justify-between gap-2 pb-2 border-b ${
                isDark ? 'border-slate-800/80' : 'border-slate-100'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="text-amber-600">📍</span>
                  <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Pincode 641012 added</span>
                </div>
                <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'} whitespace-nowrap`}>32 mins ago</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600">✔</span>
                  <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Payment of ₹56,700 approved</span>
                </div>
                <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'} whitespace-nowrap`}>1 hour ago</span>
              </div>
            </div>
          </div>
          <div className={`text-right pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'} mt-4`}>
            <span className={`text-[11px] font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'} hover:underline cursor-pointer`}>
              View All
            </span>
          </div>
        </div>

        {/* Column 3: Status Overview (Donut Chart) */}
        <div className={`admin-card p-5 ${cardBaseStyle} border flex flex-col justify-between transition-colors`}>
          <h4 className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} mb-2`}>Status Overview</h4>
          
          <div className="flex items-center justify-between my-auto py-2">
            {/* Donut with text in middle */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    innerRadius={36}
                    outerRadius={48}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>92%</span>
                <span className={`text-[9px] ${isDark ? 'text-slate-400' : 'text-slate-500'} font-semibold uppercase`}>Active</span>
              </div>
            </div>

            {/* Legend on right */}
            <div className="space-y-2 text-xs pr-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Active</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'} ml-auto`}>92%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Inactive</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'} ml-auto`}>5%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-700"></span>
                <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Pending</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'} ml-auto`}>3%</span>
              </div>
            </div>
          </div>

          <div className="h-4"></div>
        </div>
      </div>
    </div>
  );
}
