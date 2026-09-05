import React from 'react';
import { HierarchyNavigator } from '../../components/HierarchyNavigator';
import { useTheme } from '../../context/ThemeContext';
import { Globe2 } from 'lucide-react';

export function StatesOverview() {
  const { isDark } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          State Territorial Overview
        </h2>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Geographic structure, regional hierarchy tree, and administrative territory breakdown.
        </p>
      </div>

      {/* State Overview Summary Banner */}
      <div className={`admin-card p-6 ${
        isDark
          ? 'bg-[#131f37] border-[#1f3358]'
          : 'bg-white border-slate-200/90 shadow-sm'
      } border rounded-2xl transition-colors`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${
              isDark
                ? 'bg-blue-950/60 text-blue-400 border-blue-900/50'
                : 'bg-blue-50 text-blue-600 border-blue-100'
            } border`}>
              <Globe2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Tamil Nadu Regional Command
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isDark
                    ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                } border`}>
                  Fully Operational
                </span>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-1`}>
                38 Total Districts • 128 Divisions • 1,256 Registered Pincode Service Hubs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Headquarters</div>
              <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Chennai Regional HQ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Hierarchy Explorer */}
      <HierarchyNavigator />
    </div>
  );
}
