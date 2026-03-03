"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Clock,
    AlertCircle,
    CheckCircle2,
    ArrowRight,
    MoreVertical,
    Calendar,
    User as UserIcon,
    Zap
} from 'lucide-react';
import { Task, TeamMember } from '@/context/DataContext';

interface MissionQueueProps {
    tasks: Task[];
    agents: TeamMember[];
    onUpdateTask: (id: string, updates: Partial<Task>) => void;
    onSelectTask: (task: Task) => void;
}

const COLUMNS = [
    { id: 'PLANNING', label: 'PRE_PLANNING', color: 'text-white/20' },
    { id: 'INBOX', label: 'MISSION_INBOX', color: 'text-blue-400' },
    { id: 'ASSIGNED', label: 'ASSIGNED_OPS', color: 'text-purple-400' },
    { id: 'IN_PROGRESS', label: 'ACTIVE_EXECUTION', color: 'text-brand-gold' },
    { id: 'TESTING', label: 'SIT_EST_TESTING', color: 'text-green-400' },
    { id: 'REVIEW', label: 'FINAL_VALIDATION', color: 'text-red-400' },
];

export default function MissionQueue({ tasks, agents, onUpdateTask, onSelectTask }: MissionQueueProps) {
    const getTasksByStatus = (status: string) => tasks.filter(t => t.status === status);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'CRITICAL': return 'bg-red-500 text-white';
            case 'HIGH': return 'bg-orange-500 text-white';
            case 'NORMAL': return 'bg-brand-gold text-brand-dark';
            default: return 'bg-white/10 text-white/40';
        }
    };

    return (
        <div className="flex gap-6 h-full overflow-x-auto pb-4 custom-scrollbar">
            {COLUMNS.map((column) => (
                <div key={column.id} className="flex-shrink-0 w-80 flex flex-col gap-4">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <div className={`h-1.5 w-1.5 rounded-full bg-current ${column.color}`} />
                            <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] ${column.color}`}>
                                {column.label}
                            </h3>
                        </div>
                        <span className="text-[9px] font-mono text-white/20 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                            {getTasksByStatus(column.id).length}
                        </span>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-1">
                        {getTasksByStatus(column.id).map((task) => {
                            const assignee = agents.find(a => a.id === task.assigneeId);

                            return (
                                <motion.div
                                    layoutId={task.id}
                                    key={task.id}
                                    onClick={() => onSelectTask(task)}
                                    className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-brand-gold/30 transition-all cursor-pointer group relative overflow-hidden"
                                >
                                    {/* Task Background Accent */}
                                    <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                                        <Zap size={48} />
                                    </div>

                                    <div className="flex items-start justify-between mb-4">
                                        <span className={`text-[7px] font-black uppercase tracking-widest px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                                            {task.priority}_PRIORITY
                                        </span>
                                        <button className="text-white/10 hover:text-white transition-colors">
                                            <MoreVertical size={14} />
                                        </button>
                                    </div>

                                    <h4 className="text-[11px] font-black text-white/90 uppercase tracking-tight leading-relaxed mb-4 group-hover:text-brand-gold transition-colors">
                                        {task.title}
                                    </h4>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-2">
                                            <div className="h-5 w-5 rounded-md overflow-hidden bg-white/5 border border-white/10">
                                                {assignee ? (
                                                    <img src={assignee.imageURL} alt="" className="h-full w-full object-cover" />
                                                ) : (
                                                    <UserIcon size={10} className="text-white/20 m-auto mt-1" />
                                                )}
                                            </div>
                                            <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest truncate">
                                                {assignee ? assignee.name : 'UNASSIGNED'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 justify-end">
                                            <Calendar size={10} className="text-white/20" />
                                            <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">
                                                {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'NO_DEADLINE'}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}

                        <button className="w-full py-4 rounded-xl border border-dashed border-white/5 hover:border-white/20 hover:bg-white/[0.02] transition-all text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-white/40">
                            + Initialize_Task
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
