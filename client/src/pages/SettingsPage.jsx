import React, { useState } from 'react';
import { Settings, Sliders, Database, Check } from 'lucide-react';
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
        <h1 className="text-xl sm:text-2xl font-bold text-[#F3F4F1] tracking-tight flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-[#2DD4BF]" />
          Workspace Configuration
        </h1>
        <p className="text-xs text-[#A7B0B8] mt-0.5">
          Manage sprint cycles, story point estimation metrics, team permissions, and API preferences.
        </p>
      </div>

      {isSaved && (
        <div className="p-3 bg-[#10B981]/15 border border-[#10B981]/30 rounded-xl text-xs text-[#10B981] flex items-center gap-2">
          <Check className="w-4 h-4 text-[#10B981] shrink-0" />
          <span>Workspace configuration preferences saved successfully.</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Sprint Cycle Settings */}
        <div className="panel-slate rounded-2xl p-5 space-y-4 border border-[#1D2329]">
          <h3 className="font-bold text-sm text-[#F3F4F1] flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#2DD4BF]" /> Sprint & Estimation Policies
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[#A7B0B8] font-semibold mb-1">
                Default Sprint Cycle Duration
              </label>
              <select
                value={sprintLength}
                onChange={(e) => setSprintLength(e.target.value)}
                className="w-full bg-[#171C21] border border-[#1D2329] rounded-xl px-3 py-2 text-[#F3F4F1] focus:border-[#19B5A5] font-medium"
              >
                <option value="1">1 Week Sprints (High-frequency)</option>
                <option value="2">2 Weeks Sprints (Standard Agile)</option>
                <option value="3">3 Weeks Sprints</option>
                <option value="4">4 Weeks Sprints (Monthly Release)</option>
              </select>
            </div>

            <div>
              <label className="block text-[#A7B0B8] font-semibold mb-1">
                Story Points Estimation System
              </label>
              <select
                value={estimationScale}
                onChange={(e) => setEstimationScale(e.target.value)}
                className="w-full bg-[#171C21] border border-[#1D2329] rounded-xl px-3 py-2 text-[#F3F4F1] focus:border-[#19B5A5] font-medium"
              >
                <option value="fibonacci">Modified Fibonacci (1, 2, 3, 5, 8 pts)</option>
                <option value="linear">Linear Scale (1, 2, 3, 4, 5 pts)</option>
                <option value="tshirt">T-Shirt Sizing (XS, S, M, L, XL)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Database & Infrastructure Status */}
        <div className="panel-slate rounded-2xl p-5 space-y-4 border border-[#1D2329]">
          <h3 className="font-bold text-sm text-[#F3F4F1] flex items-center gap-2">
            <Database className="w-4 h-4 text-[#2DD4BF]" /> Database & Environment Health
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#171C21] border border-[#1D2329] space-y-1">
              <div className="text-[#707A84] font-medium text-[11px]">Backend API Host</div>
              <div className="font-mono text-[#F3F4F1] font-semibold">http://localhost:5003</div>
              <span className="inline-block px-1.5 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] text-[10px] font-mono border border-[#10B981]/30">
                Port 5003 Active
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#171C21] border border-[#1D2329] space-y-1">
              <div className="text-[#707A84] font-medium text-[11px]">Database Service</div>
              <div className="font-mono text-[#F3F4F1] font-semibold">kairo_pm_db (MySQL)</div>
              <span className="inline-block px-1.5 py-0.5 rounded bg-[#12161A] text-[#2DD4BF] text-[10px] font-mono border border-[#1D2329]">
                Dual Mode Fallback
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#171C21] border border-[#1D2329] space-y-1">
              <div className="text-[#707A84] font-medium text-[11px]">Project Attribution</div>
              <div className="font-mono text-[#F3F4F1] font-semibold">Intern ID: CITS4953</div>
              <span className="inline-block px-1.5 py-0.5 rounded bg-[#12161A] text-[#A7B0B8] text-[10px] font-mono border border-[#1D2329]">
                Software Engineering
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-[#19B5A5] hover:bg-[#149A8C] text-[#0B0D0F] font-semibold text-xs transition-colors shadow-sm"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
