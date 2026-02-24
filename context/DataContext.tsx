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
    name: string;
    slug: string;
    role: string;
    email: string;
    phoneNumber?: string;
    linkedInUrl?: string;
    imageURL: string;
    bio: string;
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
    updateFirm: (id: string, updates: Partial<Firm>) => void;
    updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
    updateDeal: (id: string, updates: Partial<Deal>) => void;
    addFirm: (firm: Firm) => void;
    addTeamMember: (member: TeamMember) => void;
    addDeal: (deal: Deal) => void;
    deleteDeal: (id: string) => void;
    deleteFirm: (id: string) => void;
    activities: Activity[];
    addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
    isInitialized: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [firms, setFirms] = useState<Firm[]>(MOCK_FIRMS);
    const [deals, setDeals] = useState<Deal[]>(MOCK_DEALS);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);
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

                if (savedFirms) setFirms(savedFirms);
                if (savedDeals) {
                    // Normalize legacy data: Ensure teamMemberIds array exists
                    const normalizedDeals = savedDeals.map((d: any) => ({
                        ...d,
                        teamMemberIds: d.teamMemberIds || (d.teamMemberId ? [d.teamMemberId] : [])
                    }));
                    setDeals(normalizedDeals);
                }
                if (savedTeam) {
                    // Normalize legacy data: Ensure firmIds array exists
                    const normalizedTeam = savedTeam.map((m: any) => ({
                        ...m,
                        firmIds: m.firmIds || (m.firmId ? [m.firmId] : [])
                    }));
                    setTeamMembers(normalizedTeam);
                }

                // 2. Fallback/Migration: If IndexedDB is empty, check LocalStorage
                if (!savedFirms && !savedDeals && !savedTeam) {
                    const legacyFirms = localStorage.getItem('prvtmkt_firms');
                    const legacyDeals = localStorage.getItem('prvtmkt_deals');
                    const legacyTeam = localStorage.getItem('prvtmkt_team');

                    if (legacyFirms) setFirms(JSON.parse(legacyFirms));
                    if (legacyDeals) {
                        const parsedDeals = JSON.parse(legacyDeals);
                        const normalizedDeals = parsedDeals.map((d: any) => ({
                            ...d,
                            teamMemberIds: d.teamMemberIds || (d.teamMemberId ? [d.teamMemberId] : [])
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

    const addDeal = (deal: Deal) => {
        setDeals(prev => [deal, ...prev]);
        addActivity({
            type: 'DEAL_ADDED',
            title: `New deal uploaded: ${deal.address}`,
            dealId: deal.id,
            firmId: deal.firmId
        });
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
            updateFirm,
            updateTeamMember,
            updateDeal,
            addFirm,
            addTeamMember,
            addDeal,
            deleteDeal,
            deleteFirm,
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
