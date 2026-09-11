import React, { useState } from 'react';
import { Settings, Shield, Sliders, Bell, Database, Server, Check } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function SettingsPage() {
  const { activeProject } = useProject();
  const [sprintLength, setSprintLength] = useState('2');
  const [estimationScale, setEstimationScale] = useState('fibonacci');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-indigo-400" />
          Workspace Configuration
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage sprint cycles, story point estimation metrics, team permissions, and API preferences.
        </p>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-950/70 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Workspace configuration preferences saved successfully.</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Sprint Cycle Settings */}
        <div className="panel-slate rounded-2xl p-5 space-y-4 border border-[#1f2637]">
          <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" /> Sprint & Estimation Policies
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Default Sprint Cycle Duration
              </label>
              <select
                value={sprintLength}
                onChange={(e) => setSprintLength(e.target.value)}
                className="w-full bg-[#161b26] border border-[#232b3e] rounded-xl px-3 py-2 text-slate-200 focus:border-indigo-500 font-medium"
              >
                <option value="1">1 Week Sprints (High-frequency)</option>
                <option value="2">2 Weeks Sprints (Standard Agile)</option>
                <option value="3">3 Weeks Sprints</option>
                <option value="4">4 Weeks Sprints (Monthly Release)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Story Points Estimation System
              </label>
              <select
                value={estimationScale}
                onChange={(e) => setEstimationScale(e.target.value)}
                className="w-full bg-[#161b26] border border-[#232b3e] rounded-xl px-3 py-2 text-slate-200 focus:border-indigo-500 font-medium"
              >
                <option value="fibonacci">Modified Fibonacci (1, 2, 3, 5, 8 pts)</option>
                <option value="linear">Linear Scale (1, 2, 3, 4, 5 pts)</option>
                <option value="tshirt">T-Shirt Sizing (XS, S, M, L, XL)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Database & Infrastructure Status */}
        <div className="panel-slate rounded-2xl p-5 space-y-4 border border-[#1f2637]">
          <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" /> Database & Environment Health
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#141824] border border-[#1e2638] space-y-1">
              <div className="text-slate-400 font-medium text-[11px]">Backend API Host</div>
              <div className="font-mono text-slate-200 font-semibold">http://localhost:5003</div>
              <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-mono">
                Port 5003
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#141824] border border-[#1e2638] space-y-1">
              <div className="text-slate-400 font-medium text-[11px]">Database Service</div>
              <div className="font-mono text-slate-200 font-semibold">kairo_pm_db (MySQL)</div>
              <span className="inline-block px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 text-[10px] font-mono">
                Dual Mode Fallback
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#141824] border border-[#1e2638] space-y-1">
              <div className="text-slate-400 font-medium text-[11px]">Project Attribution</div>
              <div className="font-mono text-slate-200 font-semibold">Intern ID: CITS4953</div>
              <span className="inline-block px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                Software Engineering Task
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-md shadow-indigo-600/30"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
