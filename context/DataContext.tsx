"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_FIRMS, MOCK_DEALS, MOCK_TEAM_MEMBERS } from '@/lib/mock-data';
import { storage } from '@/lib/storage';

export interface Firm {
    id: string;
    name: string;
    slug: string;
    bio?: string;
    primaryColor?: string;
    backgroundColor?: string;
    fontColor?: string;
    accentColor?: string;
    showAgencyBranding?: boolean;
    logoUrl?: string;
    heroMediaUrl?: string;
    physicalAddress?: string;
    linkedInUrl?: string;
    googleReviewsUrl?: string;
    logoScale?: number;
    borderRadius?: 'rounded' | 'square';
    isColorLinked?: boolean;
    isFontLinked?: boolean;
    firmNameFontFamily?: string;
    firmNameFontWeight?: string;
    firmNameFontSize?: number;
    firmNameFontColor?: string;
    bioFontFamily?: string;
    bioFontSize?: number;
    bioFontColor?: string;
}

export interface TeamMember {
    id: string;
    firmId: string;
    firmIds: string[];
    userId?: string; // Link to a System User for self-editing
    name: string;
    slug: string;
    role: string;
    email?: string;
    phoneNumber?: string;
    linkedInUrl?: string;
    imageURL: string;
    bio: string;
    heroMediaUrl?: string;
}

// Enhanced User interface for multi‑tenant authentication
export interface User {
    id: string;
    email: string;
    password?: string; // Hashed in production
    firmId?: string; // the firm this user belongs to
    role: "FIRM_ADMIN" | "USER" | "SYSTEM_ADMIN";
}

export interface Deal {
    id: string;
    firmId: string;
    teamMemberId?: string;
    address: string;
    assetType: string;
    strategy: string;
    purchaseAmount?: number | null;
    financedAmount?: number | null;
    stillImageURL: string;
    images?: string[];
    isPublic: boolean;
    capRate?: number | null;
    sqFt?: number | null;
    createdAt?: string;
    updatedAt?: string;
    context?: string;
    financingType?: "Debt Financing" | "Equity Ownership";
    rehabAmount?: number;
    arv?: number;
    investmentOverview?: string;
    generatedVideoURL?: string; // Cinematic AI Video
    teamMemberIds: string[];
}

interface Activity {
    id: string;
    type: 'DEAL_ADDED' | 'DEAL_DELETED' | 'FIRM_ADDED' | 'FIRM_DELETED' | 'MEMBER_ADDED' | 'MEMBER_DELETED' | 'USER_ADDED' | 'USER_DELETED';
    title: string;
    timestamp: string;
    firmId?: string;
    dealId?: string;
}

interface DataContextType {
    firms: Firm[];
    deals: Deal[];
    teamMembers: TeamMember[];
    users: User[];
    updateFirm: (id: string, updates: Partial<Firm>) => Promise<boolean | string>;
    updateTeamMember: (id: string, updates: Partial<TeamMember>) => Promise<boolean>;
    updateDeal: (id: string, updates: Partial<Deal> | ((prev: Deal) => Partial<Deal>)) => Promise<boolean>;
    addFirm: (firm: Firm) => Promise<void>;
    addTeamMember: (member: TeamMember) => Promise<TeamMember | null>;
    addDeal: (deal: Deal) => Promise<void>;
    deleteDeal: (id: string) => void;
    deleteFirm: (id: string) => void;
    addUser: (user: User) => void;
    updateUser: (id: string, updates: Partial<User>) => void;
    deleteUser: (id: string) => void;
    deleteTeamMember: (id: string) => void;
    getUserById: (id: string) => User | undefined;
    getUsersByFirmId: (firmId: string) => User[];

    // Auth actions
    currentUser: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<User | null>;
    signup: (userData: Omit<User, 'id'>, firmData: Omit<Firm, 'id'>) => Promise<{ user: User; firm: Firm } | null>;
    logout: () => void;

    activities: Activity[];
    addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
    isInitialized: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [firms, setFirms] = useState<Firm[]>([]);
    const [deals, setDeals] = useState<Deal[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load initial data from Supabase API
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Fetch basic data from Supabase
                const [firmsRes, dealsRes, membersRes] = await Promise.all([
                    fetch('/api/firms'),
                    fetch('/api/deals'),
                    fetch('/api/members')
                ]);

                if (firmsRes.ok) setFirms(await firmsRes.json());
                if (dealsRes.ok) {
                    const data = await dealsRes.json();
                    setDeals(data.map((d: any) => ({
                        ...d,
                        teamMemberIds: d.teamMemberIds || (d.teamMemberId ? [d.teamMemberId] : [])
                    })));
                }
                if (membersRes.ok) {
                    const data = await membersRes.json();
                    // Normalize firmIds to support both legacy singular and modern plural patterns
                    setTeamMembers(data.map((m: any) => ({
                        ...m,
                        firmIds: m.firmIds || (m.firmId ? [m.firmId] : [])
                    })));
                }

                // Load session if exists
                const savedSession = await storage.getItem<User>('prvtmkt_session');
                if (savedSession) setCurrentUser(savedSession);
            } catch (error) {
                console.error("Storage: Failed to initialize data from Supabase.", error);
            } finally {
                setIsInitialized(true);
            }
        };

        loadInitialData();
    }, []);

    // Save to IndexedDB when state changes
    useEffect(() => {
        if (isInitialized) {
            storage.setItem('prvtmkt_firms', firms).catch(e =>
                console.error("Storage: Failed to save firms.", e)
            );
        }
    }, [firms, isInitialized]);

    // Persist users when they change
    useEffect(() => {
        if (isInitialized) {
            storage.setItem('prvtmkt_users', users).catch(e =>
                console.error("Storage: Failed to save users.", e)
            );
        }
    }, [users, isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            storage.setItem('prvtmkt_team', teamMembers).catch(e =>
                console.error("Storage: Failed to save team.", e)
            );
        }
    }, [teamMembers, isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            storage.setItem('prvtmkt_activities', activities).catch(e =>
                console.error("Storage: Failed to save activities.", e)
            );
        }
    }, [activities, isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            storage.setItem('prvtmkt_deals', deals).catch(e =>
                console.error("Storage: Failed to save deals.", e)
            );
        }
    }, [deals, isInitialized]);

    const updateFirm = async (id: string, updates: Partial<Firm>) => {
        try {
            // Typography Sync Logic
            const firmToUpdate = firms.find(f => f.id === id);
            let finalUpdates = { ...updates };

            if (firmToUpdate?.isFontLinked || updates.isFontLinked) {
                // If font is linked, sync family and size from Firm Name to Bio
                if (updates.firmNameFontFamily) {
                    finalUpdates.bioFontFamily = updates.firmNameFontFamily;
                }
                if (updates.firmNameFontSize) {
                    finalUpdates.bioFontSize = updates.firmNameFontSize;
                }
                if (updates.firmNameFontColor) {
                    finalUpdates.bioFontColor = updates.firmNameFontColor;
                }
            }

            const res = await fetch(`/api/firms/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalUpdates),
            });
            if (res.ok) {
                const updatedFirm = await res.json();
                setFirms(prev => prev.map(f => f.id === id ? updatedFirm : f));
                return true;
            } else {
                const errorData = await res.json();
                console.error('Firm update failed:', errorData);
                return errorData.error || `Update failed with status: ${res.status}`;
            }
        } catch (error) {
            console.error('Failed to update firm:', error);
            return false;
        }
    };

    const updateTeamMember = async (id: string, updates: Partial<TeamMember>) => {
        try {
            const res = await fetch(`/api/members/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });
            if (res.ok) {
                const updatedMember = await res.json();
                const normalizedMember = {
                    ...updatedMember,
                    firmIds: updatedMember.firmIds || (updatedMember.firmId ? [updatedMember.firmId] : [])
                };
                setTeamMembers(prev => prev.map(m => m.id === id ? normalizedMember : m));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to update team member:', error);
            return false;
        }
    };

    const addFirm = async (firm: Firm) => {
        try {
            const res = await fetch('/api/firms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(firm),
            });
            if (res.ok) {
                const savedFirm = await res.json();
                setFirms(prev => [savedFirm, ...prev]);
                addActivity({
                    type: 'FIRM_ADDED',
                    title: `Added new firm: ${savedFirm.name}`,
                    firmId: savedFirm.id
                });
            }
            // No explicit return needed for Promise<void>
        } catch (error) {
            console.error('Failed to add firm:', error);
            // No explicit return needed for Promise<void>
        }
    };

    const addTeamMember = async (member: TeamMember) => {
        try {
            const res = await fetch('/api/members', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(member),
            });
            if (res.ok) {
                const savedMember = await res.json();
                const normalizedMember = {
                    ...savedMember,
                    firmIds: savedMember.firmIds || (savedMember.firmId ? [savedMember.firmId] : [])
                };
                setTeamMembers(prev => [normalizedMember, ...prev]);
                addActivity({
                    type: 'MEMBER_ADDED',
                    title: `Added new team member: ${normalizedMember.name}`,
                    firmId: normalizedMember.firmId || ""
                });
                return normalizedMember;
            }
            return null;
        } catch (error) {
            console.error('Failed to add team member:', error);
            return null;
        }
    };

    // New user helpers
    const addUser = (user: User) => {
        setUsers(prev => [user, ...prev]);
        addActivity({
            type: 'USER_ADDED',
            title: `Added user ${user.email}`,
            firmId: user.firmId
        });
    };

    const getUserById = (id: string) => users.find(u => u.id === id);
    const getUsersByFirmId = (firmId: string) => users.filter(u => u.firmId === firmId);

    const updateUser = (id: string, updates: Partial<User>) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    };

    const deleteUser = (id: string) => {
        const user = users.find(u => u.id === id);
        setUsers(prev => prev.filter(u => u.id !== id));
        if (user) {
            addActivity({
                type: 'USER_DELETED',
                title: `Removed user: ${user.email}`,
                firmId: user.firmId
            });
        }
        if (currentUser?.id === id) {
            logout();
        }
    };

    const addDeal = async (deal: Deal) => {
        try {
            const res = await fetch('/api/deals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(deal),
            });
            if (res.ok) {
                const savedDeal = await res.json();
                setDeals(prev => [savedDeal, ...prev]);
                addActivity({
                    type: 'DEAL_ADDED',
                    title: `New deal uploaded: ${savedDeal.address}`,
                    dealId: savedDeal.id,
                    firmId: savedDeal.firmId
                });
            }
        } catch (error) {
            console.error('Failed to add deal:', error);
        }
    };

    // Auth Implementation
    const login = async (email: string, password: string) => {
        const user = users.find(u => u.email === email);
        if (user) {
            // In a real app, verify password here
            setCurrentUser(user);
            await storage.setItem('prvtmkt_session', user);
            return user;
        }
        return null;
    };

    const signup = async (userData: Omit<User, 'id'>, firmData: Omit<Firm, 'id'>) => {
        try {
            // 1. Create Firm
            const newFirmId = `f-${Date.now()}`;
            const newFirm: Firm = {
                ...firmData,
                id: newFirmId,
                slug: firmData.slug || firmData.name.toLowerCase().replace(/\s+/g, '-'),
            };

            // 2. Create User linked to Firm
            const newUserId = `u-${Date.now()}`;
            const newUser: User = {
                ...userData,
                id: newUserId,
                firmId: newFirmId,
                role: "FIRM_ADMIN" // First user of a firm is an admin
            };

            setFirms(prev => [newFirm, ...prev]);
            setUsers(prev => [newUser, ...prev]);
            setCurrentUser(newUser);

            await storage.setItem('prvtmkt_session', newUser);

            addActivity({
                type: 'FIRM_ADDED',
                title: `New firm registered: ${newFirm.name}`,
                firmId: newFirmId
            });

            return { user: newUser, firm: newFirm };
        } catch (error) {
            console.error("Signup failed:", error);
            return null;
        }
    };

    const logout = () => {
        setCurrentUser(null);
        storage.removeItem('prvtmkt_session');
    };

    const updateDeal = async (id: string, updates: Partial<Deal> | ((prev: Deal) => Partial<Deal>)) => {
        try {
            const currentDeal = deals.find(d => d.id === id);
            if (!currentDeal) return false;
            const resolvedUpdates = typeof updates === 'function' ? updates(currentDeal) : updates;

            const res = await fetch(`/api/deals/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resolvedUpdates),
            });
            if (res.ok) {
                const updatedDeal = await res.json();
                setDeals(prev => prev.map(d => d.id === id ? updatedDeal : d));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to update deal:', error);
            return false;
        }
    };

    const deleteDeal = async (id: string) => {
        try {
            const deal = deals.find(d => d.id === id);
            const res = await fetch(`/api/deals/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setDeals(prev => prev.filter(d => d.id !== id));
                if (deal) {
                    addActivity({
                        type: 'DEAL_DELETED',
                        title: `Deleted deal: ${deal.address}`,
                        firmId: deal.firmId
                    });
                }
            }
        } catch (error) {
            console.error('Failed to delete deal:', error);
        }
    };

    const deleteFirm = async (id: string) => {
        try {
            const firm = firms.find(f => f.id === id);
            const res = await fetch(`/api/firms/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setFirms(prev => prev.filter(f => f.id !== id));
                if (firm) {
                    addActivity({
                        type: 'FIRM_DELETED',
                        title: `Deleted firm: ${firm.name}`,
                        firmId: id
                    });
                }
                // Cascading: These would ideally be handled by the server but we update local state for immediate feedback
                setDeals(prev => prev.map(d => d.firmId === id ? { ...d, firmId: "" } : d));
                setTeamMembers(prev => prev.map(m => m.firmId === id ? { ...m, firmId: "" } : m));
            }
        } catch (error) {
            console.error('Failed to delete firm:', error);
        }
    };

    const deleteTeamMember = async (id: string) => {
        try {
            console.log(`[DataContext] Attempting to delete team member: ${id}`);
            const member = teamMembers.find(m => m.id === id);
            const res = await fetch(`/api/members/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setTeamMembers(prev => prev.filter(m => m.id !== id));
                if (member) {
                    addActivity({
                        type: 'MEMBER_DELETED',
                        title: `Removed team member: ${member.name}`,
                        firmId: (member.firmIds && member.firmIds.length > 0) ? member.firmIds[0] : (member.firmId || "")
                    });
                }
                console.log(`[DataContext] Successfully deleted team member: ${id}`);
            } else {
                const errData = await res.json().catch(() => ({}));
                console.error(`[DataContext] Delete failed: ${res.status}`, errData);
            }
        } catch (error) {
            console.error('[DataContext] Failed to delete team member:', error);
        }
    };

    const addActivity = (activity: Omit<Activity, 'id' | 'timestamp'>) => {
        const newActivity: Activity = {
            ...activity,
            id: `act-${Date.now()}`,
            timestamp: new Date().toISOString()
        };
        setActivities(prev => [newActivity, ...prev]);
    };

    return (
        <DataContext.Provider value={{
            firms,
            deals,
            teamMembers,
            users,
            updateFirm,
            updateTeamMember,
            updateDeal,
            addFirm,
            addTeamMember,
            addDeal,
            deleteDeal,
            deleteFirm,
            addUser,
            updateUser,
            deleteUser,
            getUserById,
            getUsersByFirmId,
            currentUser,
            isAuthenticated: !!currentUser,
            login,
            signup,
            logout,
            activities,
            addActivity,
            deleteTeamMember,
            isInitialized
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    // Debug log to verify context integrity
    if (typeof window !== 'undefined' && !context.addFirm) {
        console.warn("DataContext: addFirm is missing from context!", context);
    }
    return context;
}
