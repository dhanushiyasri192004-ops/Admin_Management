import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { useTheme } from '../../context/ThemeContext';
import { Download } from 'lucide-react';

export function DivisionalReports() {
  const { isDark } = useTheme();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReport() {
      try {
        const res = await dataService.getBusinessReports();
        if (res.success) setReport(res.report);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadReport();
  }, []);

  const cardStyle = isDark
    ? 'bg-[#131f37] border-[#1f3358]'
    : 'bg-white border-slate-200/90 shadow-sm';

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className={`h-8 ${isDark ? 'bg-slate-800' : 'bg-slate-200'} rounded w-1/4`}></div>
        <div className={`h-48 ${isDark ? 'bg-slate-800' : 'bg-slate-200'} rounded`}></div>
      </div>
    );
  }

  const s = report?.summary || {};

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Divisional Business & Financial Reports
          </h2>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Jurisdiction: {report?.adminScope}
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-md shadow-blue-500/20"
        >
          <Download className="w-4 h-4" />
          Print / Export Full Report
        </button>
      </div>

      {/* Financial Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`admin-card p-5 rounded-2xl ${cardStyle} border transition-colors`}>
          <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} font-semibold uppercase`}>
            Gross Sales Value
          </div>
          <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mt-1`}>
            ₹{(s.grossSalesValue || 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Total revenue generated</div>
        </div>

        <div className={`admin-card p-5 rounded-2xl ${cardStyle} border transition-colors`}>
          <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} font-semibold uppercase`}>
            Card Discounts Given
          </div>
          <div className={`text-2xl font-black ${isDark ? 'text-amber-400' : 'text-amber-600'} mt-1`}>
            ₹{(s.discountsGiven || 0).toLocaleString()}
          </div>
          <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-1`}>
            Silver / Gold / Diamond
          </div>
        </div>

        <div className={`admin-card p-5 rounded-2xl ${cardStyle} border transition-colors`}>
          <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} font-semibold uppercase`}>
            Net Collected Revenue
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            ₹{(s.netRevenue || 0).toLocaleString()}
          </div>
          <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-1`}>
            Post customer discounts
          </div>
        </div>

        <div className={`admin-card p-5 rounded-2xl ${cardStyle} border transition-colors`}>
          <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} font-semibold uppercase`}>
            Active Customers
          </div>
          <div className="text-2xl font-black text-blue-600 dark:text-indigo-400 mt-1">
            {s.activeCustomerBase || 0}
          </div>
          <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-1`}>
            Across assigned division
          </div>
        </div>
      </div>

      {/* Report Tables */}
      <div className={`admin-card rounded-2xl p-6 ${cardStyle} border space-y-4 transition-colors`}>
        <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Recent Transactions & Dispatches
        </h3>
        <div className="overflow-x-auto">
          <table className={`w-full text-left text-xs ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
            <thead className={`${
              isDark ? 'bg-slate-950/60 text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-500 border-slate-200'
            } uppercase text-[10px] border-b`}>
              <tr>
                <th className="px-4 py-3">Order Number</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Location (PIN)</th>
                <th className="px-4 py-3">Gross Total</th>
                <th className="px-4 py-3">Net Payable</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-100'}`}>
              {report?.ordersList?.map(o => (
                <tr key={o.id} className={`${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'} transition-colors`}>
                  <td className={`px-4 py-3 font-mono font-bold ${isDark ? 'text-indigo-300' : 'text-blue-600'}`}>
                    {o.orderNumber}
                  </td>
                  <td className={`px-4 py-3 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {o.customerName}
                  </td>
                  <td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400">PIN: {o.pincode}</td>
                  <td className={`px-4 py-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    ₹{o.totalAmount?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{o.netPayable?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isDark
                        ? 'bg-indigo-950 text-indigo-300 border-indigo-800'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    } border`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
