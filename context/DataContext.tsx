"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_FIRMS, MOCK_DEALS, MOCK_TEAM_MEMBERS } from '@/lib/mock-data';
import { storage } from '@/lib/storage';

interface Firm {
    id: string;
    name: string;
    slug: string;
    logoUrl: string;
    primaryColor: string;
    bio?: string;
    backgroundColor?: string;
    fontColor?: string;
    secondaryColor?: string;
    showAgencyBranding?: boolean;
    physicalAddress?: string;
    linkedInUrl?: string;
    googleReviewsUrl?: string;
    heroMediaUrl?: string;
}

interface TeamMember {
    id: string;
    firmIds: string[];
    userId?: string; // Link to a System User for self-editing
    name: string;
    slug: string;
    role: string;
    email: string;
    phoneNumber?: string;
    linkedInUrl?: string;
    imageURL: string;
    bio: string;
}

// Enhanced User interface for multi‑tenant authentication
interface User {
    id: string;
    email: string;
    password?: string; // Hashed in production
    firmId: string; // the firm this user belongs to
    role: "ADMIN" | "USER" | "SYSTEM_ADMIN";
}

interface Deal {
    id: string;
    firmId: string;
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
    teamMemberIds: string[];
    context?: string;
    financingType?: "Debt Financing" | "Equity Ownership";
    rehabAmount?: number;
    arv?: number;
    investmentOverview?: string;
}

interface Activity {
    id: string;
    type: 'DEAL_ADDED' | 'FIRM_ADDED' | 'MEMBER_ADDED';
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
    updateFirm: (id: string, updates: Partial<Firm>) => void;
    updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
    updateDeal: (id: string, updates: Partial<Deal>) => void;
    addFirm: (firm: Firm) => void;
    addTeamMember: (member: TeamMember) => void;
    addDeal: (deal: Deal) => void;
    deleteDeal: (id: string) => void;
    deleteFirm: (id: string) => void;
    addUser: (user: User) => void;
    updateUser: (id: string, updates: Partial<User>) => void;
    deleteUser: (id: string) => void;
    getUserById: (id: string) => User | undefined;
    getUsersByFirmId: (firmId: string) => User[];

    // Auth actions
    currentUser: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (userData: Omit<User, 'id'>, firmData: Omit<Firm, 'id'>) => Promise<boolean>;
    logout: () => void;

    activities: Activity[];
    addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
    isInitialized: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [firms, setFirms] = useState<Firm[]>(MOCK_FIRMS);
    const [deals, setDeals] = useState<Deal[]>(MOCK_DEALS);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Robust loading from storage (IndexedDB with LocalStorage fallback/migration)
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // 1. Try to load from IndexedDB (the new source of truth)
                const savedFirms = await storage.getItem<Firm[]>('prvtmkt_firms');
                const savedDeals = await storage.getItem<Deal[]>('prvtmkt_deals');
                const savedTeam = await storage.getItem<TeamMember[]>('prvtmkt_team');
                const savedUsers = await storage.getItem<User[]>('prvtmkt_users');

                if (savedFirms) setFirms(savedFirms);
                if (savedDeals) {
                    const normalizedDeals = savedDeals.map((d: any) => ({
                        ...d,
                        teamMemberIds: d.teamMemberIds || (d.teamMemberId ? [d.teamMemberId] : []),
                        investmentOverview: d.investmentOverview || d.context || ""
                    }));
                    setDeals(normalizedDeals);
                }
                if (savedTeam) {
                    const normalizedTeam = savedTeam.map((m: any) => ({
                        ...m,
                        firmIds: m.firmIds || (m.firmId ? [m.firmId] : [])
                    }));
                    setTeamMembers(normalizedTeam);
                }
                if (savedUsers) setUsers(savedUsers);

                // Load session if exists
                const savedSession = await storage.getItem<User>('prvtmkt_session');
                if (savedSession) setCurrentUser(savedSession);

                // 2. Fallback/Migration: If IndexedDB is empty, check LocalStorage
                if (!savedFirms && !savedDeals && !savedTeam && !savedUsers) {
                    const legacyFirms = localStorage.getItem('prvtmkt_firms');
                    const legacyDeals = localStorage.getItem('prvtmkt_deals');
                    const legacyTeam = localStorage.getItem('prvtmkt_team');
                    const legacyUsers = localStorage.getItem('prvtmkt_users');

                    if (legacyFirms) setFirms(JSON.parse(legacyFirms));
                    if (legacyDeals) {
                        const parsedDeals = JSON.parse(legacyDeals);
                        const normalizedDeals = parsedDeals.map((d: any) => ({
                            ...d,
                            teamMemberIds: d.teamMemberIds || (d.teamMemberId ? [d.teamMemberId] : []),
                            investmentOverview: d.investmentOverview || d.context || ""
                        }));
                        setDeals(normalizedDeals);
                    }
                    if (legacyTeam) {
                        const parsedTeam = JSON.parse(legacyTeam);
                        const normalizedTeam = parsedTeam.map((m: any) => ({
                            ...m,
                            firmIds: m.firmIds || (m.firmId ? [m.firmId] : [])
                        }));
                        setTeamMembers(normalizedTeam);
                    }
                    if (legacyUsers) setUsers(JSON.parse(legacyUsers));

                    console.log("Storage: Migrated legacy data from LocalStorage to IndexedDB.");
                }
            } catch (error) {
                console.error("Storage: Failed to initialize data from persistence layer.", error);
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

    const updateFirm = (id: string, updates: Partial<Firm>) => {
        setFirms(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
    };

    const updateTeamMember = (id: string, updates: Partial<TeamMember>) => {
        setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    };

    const addFirm = (firm: Firm) => {
        setFirms(prev => [firm, ...prev]);
        addActivity({
            type: 'FIRM_ADDED',
            title: `Added new firm: ${firm.name}`,
            firmId: firm.id
        });
    };

    const addTeamMember = (member: TeamMember) => {
        setTeamMembers(prev => [member, ...prev]);
        addActivity({
            type: 'MEMBER_ADDED',
            title: `Added new team member: ${member.name}`,
            firmId: member.firmIds?.[0] || ""
        });
    };

    // New user helpers
    const addUser = (user: User) => {
        setUsers(prev => [user, ...prev]);
        addActivity({
            type: 'FIRM_ADDED', // reuse activity type for simplicity
            title: `Added user ${user.email} to firm ${user.firmId}`,
            firmId: user.firmId
        });
    };

    const getUserById = (id: string) => users.find(u => u.id === id);
    const getUsersByFirmId = (firmId: string) => users.filter(u => u.firmId === firmId);

    const updateUser = (id: string, updates: Partial<User>) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    };

    const deleteUser = (id: string) => {
        setUsers(prev => prev.filter(u => u.id !== id));
        if (currentUser?.id === id) {
            logout();
        }
    };

    const addDeal = (deal: Deal) => {
        setDeals(prev => [deal, ...prev]);
        addActivity({
            type: 'DEAL_ADDED',
            title: `New deal uploaded: ${deal.address}`,
            dealId: deal.id,
            firmId: deal.firmId
        });
    };

    // Auth Implementation
    const login = async (email: string, password: string) => {
        const user = users.find(u => u.email === email);
        if (user) {
            // In a real app, verify password here
            setCurrentUser(user);
            await storage.setItem('prvtmkt_session', user);
            return true;
        }
        return false;
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
                role: "ADMIN" // First user of a firm is an admin
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

            return true;
        } catch (error) {
            console.error("Signup failed:", error);
            return false;
        }
    };

    const logout = () => {
        setCurrentUser(null);
        storage.removeItem('prvtmkt_session');
    };

    const updateDeal = (id: string, updates: Partial<Deal>) => {
        setDeals(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
    };

    const deleteDeal = (id: string) => {
        setDeals(prev => prev.filter(d => d.id !== id));
    };

    const deleteFirm = (id: string) => {
        setFirms(prev => prev.filter(f => f.id !== id));
        // Cascading: Unlink deals (keep single firmId logic for deals)
        setDeals(prev => prev.map(d => d.firmId === id ? { ...d, firmId: "" } : d));
        // Cascading: Remove firm from team member firmIds
        setTeamMembers(prev => prev.map(m => ({
            ...m,
            firmIds: (m.firmIds || []).filter(fId => fId !== id)
        })));
        // Cascading: Remove members from deals teamMemberIds
        setDeals(prev => prev.map(d => ({
            ...d,
            teamMemberIds: (d.teamMemberIds || []).filter(mId => {
                const member = teamMembers.find(m => m.id === mId);
                return member && (member.firmIds || []).includes(id) ? false : true;
            })
        })));
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
