"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    X,
    Save,
    Trash2,
    AlertCircle,
    Calendar,
    User as UserIcon,
    Type,
    AlignLeft,
    Tag,
    Clock
} from 'lucide-react';
import { Task, TeamMember, useData } from '@/context/DataContext';

interface TaskModalProps {
    task?: Task | null;
    firmId: string;
    agents: TeamMember[];
    onClose: () => void;
}

export default function TaskModal({ task, firmId, agents, onClose }: TaskModalProps) {
    const { addTask, updateTask, deleteTask } = useData();
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [status, setStatus] = useState<Task['status']>(task?.status || 'INBOX');
    const [priority, setPriority] = useState<Task['priority']>(task?.priority || 'NORMAL');
    const [assigneeId, setAssigneeId] = useState(task?.assigneeId || '');
    const [dueDate, setDueDate] = useState(task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if (!title.trim()) return;
        setIsSaving(true);

        const taskData = {
            title,
            description,
            status,
            priority,
            assigneeId: assigneeId || null,
            dueDate: dueDate || null,
            firmId
        } as any;

        if (task) {
            await updateTask(task.id, taskData);
        } else {
            await addTask(taskData);
        }

        setIsSaving(false);
        onClose();
    };

    const handleDelete = async () => {
        if (!task || !confirm('Are you sure you want to abort this mission?')) return;
        await deleteTask(task.id);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-[#0a0a0a] border border-white/5 w-full max-w-2xl rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl"
            >
                {/* Header */}
                <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                            <Tag size={20} className="text-brand-gold" />
                        </div>
                        <div>
                            <h2 className="text-lg font-black uppercase tracking-tight text-white">
                                {task ? 'Edit_Mission_Protocol' : 'Initialize_Task'}
                            </h2>
                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-0.5">
                                {task ? `Node: ${task.id}` : 'System Ready for Entry'}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 space-y-8">
                    {/* Title */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                            <Type size={12} />
                            MISSION_TITLE
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task definition..."
                            className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm font-medium tracking-tight text-white placeholder:text-white/10 focus:border-brand-gold/40 outline-none transition-all"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                            <AlignLeft size={12} />
                            MISSION_BRIEFING
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Detail the parameters of this operation..."
                            rows={4}
                            className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm font-medium tracking-tight text-white placeholder:text-white/10 focus:border-brand-gold/40 outline-none transition-all resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        {/* Status */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                                <Clock size={12} />
                                MISSION_PHASE
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as any)}
                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 outline-none focus:border-brand-gold/40 transition-all appearance-none cursor-pointer"
                            >
                                {['PLANNING', 'INBOX', 'ASSIGNED', 'IN_PROGRESS', 'TESTING', 'REVIEW'].map(s => (
                                    <option key={s} value={s} className="bg-brand-dark text-white">{s}</option>
                                ))}
                            </select>
                        </div>

                        {/* Priority */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                                <AlertCircle size={12} />
                                THREAT_LEVEL
                            </label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value as any)}
                                className={`w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-[10px] font-black uppercase tracking-[0.2em] outline-none focus:border-brand-gold/40 transition-all appearance-none cursor-pointer ${priority === 'CRITICAL' ? 'text-red-500' : priority === 'HIGH' ? 'text-orange-500' : 'text-brand-gold'
                                    }`}
                            >
                                {['LOW', 'NORMAL', 'HIGH', 'CRITICAL'].map(p => (
                                    <option key={p} value={p} className="bg-brand-dark text-white">{p}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        {/* Assignee */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                                <UserIcon size={12} />
                                ASSIGNED_OPERATIVE
                            </label>
                            <select
                                value={assigneeId}
                                onChange={(e) => setAssigneeId(e.target.value)}
                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 outline-none focus:border-brand-gold/40 transition-all appearance-none cursor-pointer"
                            >
                                <option value="" className="bg-brand-dark text-white">UNASSIGNED</option>
                                {agents.map(a => (
                                    <option key={a.id} value={a.id} className="bg-brand-dark text-white">{a.name.toUpperCase()}</option>
                                ))}
                            </select>
                        </div>

                        {/* Due Date */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                                <Calendar size={12} />
                                TARGET_COMPLETION
                            </label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 outline-none focus:border-brand-gold/40 transition-all invert brightness-200"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-8 py-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
                    {task ? (
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-all text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-red-500/20"
                        >
                            <Trash2 size={16} />
                            Abort Mission
                        </button>
                    ) : <div />}

                    <button
                        onClick={handleSave}
                        disabled={isSaving || !title.trim()}
                        className="flex items-center gap-3 px-8 py-3 rounded-2xl bg-brand-gold text-brand-dark hover:brightness-110 transition-all text-[10px] font-black uppercase tracking-[0.2em] disabled:opacity-50"
                    >
                        <Save size={16} />
                        {isSaving ? 'SYNCING...' : (task ? 'UPDATE_PROTOCOL' : 'INITIALIZE_LAUNCH')}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
