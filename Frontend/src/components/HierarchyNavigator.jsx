import React, { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';
import { useTheme } from '../context/ThemeContext';
import { Network, Building, Layers, MapPin } from 'lucide-react';

export function HierarchyNavigator() {
  const { isDark } = useTheme();
  const [hierarchy, setHierarchy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await dataService.getHierarchy();
        if (res.success && res.hierarchy) {
          setHierarchy(res.hierarchy);
          if (res.hierarchy.length > 0) {
            setSelectedState(res.hierarchy[0]);
            if (res.hierarchy[0].districts && res.hierarchy[0].districts.length > 0) {
              setSelectedDistrict(res.hierarchy[0].districts[0]);
            }
          }
        }
      } catch (e) {
        console.error('Failed to load hierarchy:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className={`admin-card p-6 rounded-2xl ${
        isDark ? 'bg-[#131f37] border-[#1f3358]' : 'bg-white border-slate-200 shadow-sm'
      } border animate-pulse`}>
        <div className={`h-6 ${isDark ? 'bg-slate-800' : 'bg-slate-200'} rounded w-1/3 mb-4`}></div>
        <div className={`h-24 ${isDark ? 'bg-slate-800' : 'bg-slate-200'} rounded`}></div>
      </div>
    );
  }

  if (hierarchy.length === 0) return null;

  return (
    <div className={`admin-card rounded-2xl p-6 ${
      isDark ? 'bg-[#131f37] border-[#1f3358]' : 'bg-white border-slate-200/90 shadow-sm'
    } border transition-colors`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl ${
            isDark ? 'bg-indigo-950/60 border-indigo-700/40 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'
          } border`}>
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Geographic Hierarchy Drill-Down
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Explore authorized jurisdiction tree: State → District → Division → Pincode
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* States Column */}
        <div className={`${isDark ? 'bg-[#0f1a30] border-slate-800' : 'bg-slate-50 border-slate-200/80'} rounded-xl p-3 border transition-colors`}>
          <div className={`text-[11px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider mb-2 flex items-center gap-1.5`}>
            <Building className="w-3.5 h-3.5 text-indigo-500" />
            Authorized State(s)
          </div>
          <div className="space-y-1.5">
            {hierarchy.map(st => (
              <button
                key={st.id}
                onClick={() => {
                  setSelectedState(st);
                  if (st.districts && st.districts.length > 0) setSelectedDistrict(st.districts[0]);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition border ${
                  selectedState?.id === st.id
                    ? 'bg-indigo-600 text-white shadow-sm border-indigo-500'
                    : isDark
                    ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-800'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200/80 shadow-xs'
                }`}
              >
                <span>{st.name}</span>
                <span className="text-[10px] opacity-70">({st.districts?.length || 0} Districts)</span>
              </button>
            ))}
          </div>
        </div>

        {/* Districts Column */}
        <div className={`${isDark ? 'bg-[#0f1a30] border-slate-800' : 'bg-slate-50 border-slate-200/80'} rounded-xl p-3 border transition-colors`}>
          <div className={`text-[11px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider mb-2 flex items-center gap-1.5`}>
            <Layers className="w-3.5 h-3.5 text-cyan-500" />
            Districts
          </div>
          <div className="space-y-1.5">
            {selectedState?.districts?.map(dst => (
              <button
                key={dst.id}
                onClick={() => setSelectedDistrict(dst)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition border ${
                  selectedDistrict?.id === dst.id
                    ? 'bg-cyan-600 text-white shadow-sm border-cyan-500'
                    : isDark
                    ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-800'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200/80 shadow-xs'
                }`}
              >
                <span>{dst.name}</span>
                <span className="text-[10px] opacity-70">({dst.divisions?.length || 0} Divisions)</span>
              </button>
            ))}
          </div>
        </div>

        {/* Divisions & Pincodes Column */}
        <div className={`${isDark ? 'bg-[#0f1a30] border-slate-800' : 'bg-slate-50 border-slate-200/80'} rounded-xl p-3 border transition-colors`}>
          <div className={`text-[11px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider mb-2 flex items-center gap-1.5`}>
            <MapPin className="w-3.5 h-3.5 text-emerald-500" />
            Divisions & Pincodes
          </div>
          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {selectedDistrict?.divisions?.map(div => (
              <div key={div.id} className={`p-2.5 rounded-lg ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              } border transition-colors`}>
                <div className={`text-xs font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-700'} mb-1.5`}>
                  {div.name}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {div.pincodes?.map(pin => (
                    <span
                      key={pin}
                      className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold border ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 text-emerald-300'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      }`}
                    >
                      📍 {pin}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
