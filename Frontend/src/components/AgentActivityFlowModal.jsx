import React, { useState } from 'react';
import { Modal } from './Modal';
import { StatusBadge } from './Badge';
import { 
  Store, 
  MapPin, 
  Layers, 
  Building2, 
  Award, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  User, 
  Phone, 
  IndianRupee, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export function AgentActivityFlowModal({ isOpen, onClose, activity, onAdvance }) {
  const [advancing, setAdvancing] = useState(false);
  const [advanceNotes, setAdvanceNotes] = useState('');

  if (!activity) return null;

  const handleAdvance = async () => {
    setAdvancing(true);
    try {
      if (onAdvance) {
        await onAdvance(activity.id, advanceNotes);
      }
      setAdvanceNotes('');
    } finally {
      setAdvancing(false);
    }
  };

  const getNextActionLabel = () => {
    if (activity.currentStage === 'Divisional Agent') {
      return 'Verify as Divisional Agent (Escalate to District)';
    }
    if (activity.currentStage === 'District Agent') {
      return 'Endorse as District Agent (Escalate to State)';
    }
    if (activity.currentStage === 'State Agent' && activity.status !== 'State Approved') {
      return 'Activate Statewide (State Agent Final Approval)';
    }
    return null;
  };

  const actionLabel = getNextActionLabel();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agent Activity & Vendor Onboarding Audit Flow" maxWidth="max-w-2xl">
      <div className="space-y-5">
        {/* Header Summary Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white border border-indigo-900/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-400/30">
                {activity.id} • {activity.type}
              </span>
              <h3 className="text-base font-bold text-white mt-1.5">{activity.title}</h3>
              <p className="text-xs text-slate-300 mt-0.5">{activity.description}</p>
            </div>
            <div className="self-start sm:self-auto text-right">
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block">
                {activity.status}
              </span>
              <div className="text-[10px] text-slate-400 mt-1">
                Initiated: {activity.createdDate}
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Details (if applicable) */}
        {activity.vendorDetails && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-blue-500" /> Onboarded Vendor Profile
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">Business Name</div>
                <div className="font-bold text-slate-900 dark:text-white">{activity.vendorDetails.name}</div>
              </div>
              <div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">Contact Person & Phone</div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  {activity.vendorDetails.contactPerson} • {activity.vendorDetails.phone}
                </div>
              </div>
              <div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">Category</div>
                <div className="font-semibold text-blue-600 dark:text-blue-400">{activity.category || 'Services'}</div>
              </div>
              <div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">Location Jurisdiction</div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  PIN: {activity.pincode} • {activity.division} • {activity.district}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4-Tier Flow Timeline */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span>4-Tier Hierarchical Approval Flow</span>
            <span className="text-[10px] font-normal text-slate-500">
              Pincode → Division → District → State
            </span>
          </h4>

          <div className="space-y-2 border-l-2 border-slate-200 dark:border-slate-700 ml-3 pl-4">
            {activity.flowStages && activity.flowStages.map((stg, idx) => {
              const isDone = stg.status === 'Completed';
              const isInProgress = stg.status === 'In Progress';

              return (
                <div key={idx} className="relative pb-2 last:pb-0">
                  {/* Bullet */}
                  <div className={`absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                    isDone 
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20' 
                      : isInProgress 
                        ? 'bg-amber-500 text-white ring-4 ring-amber-500/20 animate-pulse'
                        : 'bg-slate-300 dark:bg-slate-700'
                  }`}>
                    {isDone && <CheckCircle2 className="w-2.5 h-2.5" />}
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {stg.stage}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          ({stg.actor})
                        </span>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded self-start sm:self-auto ${
                        isDone 
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                          : isInProgress
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {stg.action}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      {stg.notes}
                    </p>

                    {stg.timestamp && (
                      <div className="text-[10px] text-slate-400 mt-1 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {stg.timestamp}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Panel for Advancing Workflow */}
        {actionLabel && (
          <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900 dark:text-blue-200">
                Advance Activity to Next Hierarchical Tier
              </span>
              <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400">
                Current: {activity.currentStage}
              </span>
            </div>

            <input
              type="text"
              placeholder="Add verification / approval notes (optional)..."
              value={advanceNotes}
              onChange={(e) => setAdvanceNotes(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />

            <button
              type="button"
              disabled={advancing}
              onClick={handleAdvance}
              className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {advancing ? 'Processing...' : actionLabel}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {activity.status === 'State Approved' && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-200 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>This activity has completed full hierarchical endorsement and is live statewide across all 38 districts.</span>
          </div>
        )}
      </div>
    </Modal>
  );
}
