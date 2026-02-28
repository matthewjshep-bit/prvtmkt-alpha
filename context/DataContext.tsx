"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
    memberCardBgColor?: string;
    showMemberNarrative?: boolean;
    memberPhotoSpacing?: number;
    isMemberCardColorLinked?: boolean;
    showSearchBar?: boolean;
    cardShadowIntensity?: number;
    viewLayoutMode?: 'BOTH' | 'LIST' | 'GRID';
    portfolioListStyle?: 'TRADITIONAL' | 'ALTERNATING';
    teamListStyle?: 'TRADITIONAL' | 'ALTERNATING';
}

export interface TeamMember {
    id: string;
    firmId: string;
    firmIds: string[];
    userId?: string | null; // Link to a System User for self-editing
    name: string;
    slug: string;
    role: string;
    email?: string;
    phoneNumber?: string;
    linkedInUrl?: string;
    imageURL: string;
    bio: string;
    heroMediaUrl?: string;
    order: number;
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
    type:
    | 'DEAL_ADDED' | 'DEAL_UPDATED' | 'DEAL_DELETED'
    | 'FIRM_ADDED' | 'FIRM_UPDATED' | 'FIRM_DELETED'
    | 'MEMBER_ADDED' | 'MEMBER_UPDATED' | 'MEMBER_DELETED'
    | 'USER_ADDED' | 'USER_UPDATED' | 'USER_DELETED'
    | 'USER_IMPERSONATED' | 'IMPERSONATION_STOPPED'
    | 'FIRM_SETTINGS_UPDATED'; // Added for clarity
    title: string;
    timestamp: string;
    firmId?: string;
    dealId?: string;
    userId?: string;
    performedByEmail?: string;
}

interface DataContextType {
    firms: Firm[];
    deals: Deal[];
    teamMembers: TeamMember[];
    users: User[];
    updateFirm: (id: string, updates: Partial<Firm>) => Promise<boolean | string>;
    addTeamMember: (member: TeamMember) => Promise<TeamMember | null>;
    updateTeamMember: (id: string, updates: Partial<TeamMember>) => Promise<boolean>;
    reorderTeamMembers: (reorderedMembers: TeamMember[]) => Promise<boolean | string>;
    updateDeal: (id: string, updates: Partial<Deal> | ((prev: Deal) => Partial<Deal>)) => Promise<boolean>;
    addFirm: (firm: Firm) => Promise<void>;
    addDeal: (deal: Deal) => Promise<void>;
    deleteDeal: (id: string) => void;
    deleteFirm: (id: string) => void;
    addUser: (user: User) => Promise<User | null>;
    updateUser: (id: string, updates: Partial<User>) => Promise<boolean>;
    deleteUser: (id: string) => Promise<void>;
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
    impersonateUser: (user: User) => void;
    stopImpersonation: () => void;
    isImpersonating: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [firms, setFirms] = useState<Firm[]>([]);
    const [deals, setDeals] = useState<Deal[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [originalAdminId, setOriginalAdminId] = useState<string | null>(null);
    const router = useRouter();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load initial data from Supabase API
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Fetch basic data from Supabase
                const [firmsRes, dealsRes, membersRes, usersRes, activitiesRes] = await Promise.all([
                    fetch('/api/firms'),
                    fetch('/api/deals'),
                    fetch('/api/members'),
                    fetch('/api/users'),
                    fetch('/api/activities')
                ]);

                if (firmsRes.ok) setFirms(await firmsRes.json());
                if (dealsRes.ok) {
                    const data = await dealsRes.json();
                    setDeals(data.map((d: any) => ({
                        ...d,
                        teamMemberIds: d.teamMemberIds || (d.teamMemberId ? [d.teamMemberId] : [])
                    })));
                }
                if (activitiesRes.ok) {
                    setActivities(await activitiesRes.json());
                }
                if (membersRes.ok) {
                    const data = await membersRes.json();
                    const normalizedMembers = data.map((m: any) => {
                        // Crucial: Handle scalar array empty vs null for fallbacks
                        const currentFirmIds = m.firmIds || [];
                        const fallbackFirmId = m.firmId || "";
                        const finalFirmIds = currentFirmIds.length > 0
                            ? currentFirmIds
                            : (fallbackFirmId ? [fallbackFirmId] : []);

                        return {
                            ...m,
                            order: m.sortOrder ?? 0,
                            firmIds: finalFirmIds,
                            firmId: fallbackFirmId || (finalFirmIds.length > 0 ? finalFirmIds[0] : "")
                        };
                    });

                    const sortedMembers = normalizedMembers.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
                    setTeamMembers(sortedMembers);
                }
                if (usersRes.ok) {
                    const fetchedUsers = await usersRes.json();
                    setUsers(fetchedUsers);

                    // Sync session with the latest data from server
                    const savedSession = await storage.getItem<User>('prvtmkt_session');
                    if (savedSession) {
                        const updatedUser = fetchedUsers.find((u: User) => u.id === savedSession.id);
                        if (updatedUser) {
                            setCurrentUser(updatedUser);
                            storage.setItem('prvtmkt_session', updatedUser);
                        } else {
                            // If the user was deleted on the server, log them out
                            setCurrentUser(null);
                            storage.removeItem('prvtmkt_session');
                        }
                    }

                    // Check for active impersonation
                    const savedOriginalId = await storage.getItem<string>('prvtmkt_original_admin_id');
                    if (savedOriginalId) {
                        setOriginalAdminId(savedOriginalId);
                    }
                }
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
                addActivity({
                    type: 'FIRM_UPDATED',
                    title: `Updated firm settings: ${updatedFirm.name}`,
                    firmId: id
                });
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
            console.log(`[DataContext] updateTeamMember START for ID: ${id}`, updates);
            const res = await fetch(`/api/members/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });
            console.log(`[DataContext] API Response Status: ${res.status}`);

            if (res.ok) {
                const updatedMember = await res.json();
                console.log(`[DataContext] API returned updated member. Processing...`);

                // Normalization with robust fallback logic
                const serverFirmIds = updatedMember.firmIds || [];
                const serverFirmId = updatedMember.firmId || "";
                const normalizedFirmIds = serverFirmIds.length > 0
                    ? serverFirmIds
                    : (serverFirmId ? [serverFirmId] : []);
                const normalizedFirmId = serverFirmId || (normalizedFirmIds.length > 0 ? normalizedFirmIds[0] : "");

                const normalizedMember = {
                    ...updatedMember,
                    order: updatedMember.sortOrder ?? 0,
                    firmIds: normalizedFirmIds,
                    firmId: normalizedFirmId
                };

                setTeamMembers(prev => {
                    const newState = prev.map(m => m.id === id ? normalizedMember : m);
                    console.log(`[DataContext] State updated successfully.`);
                    return newState;
                });

                // No await here on purpose - fire and forget
                addActivity({
                    type: 'MEMBER_UPDATED',
                    title: `Updated team member: ${normalizedMember.name}`,
                    firmId: normalizedMember.firmId || ""
                });

                console.log(`[DataContext] updateTeamMember COMPLETE.`);
                return true;
            } else {
                const error = await res.json().catch(() => ({}));
                console.error(`[DataContext] updateTeamMember API Error:`, error);
                localStorage.setItem('last_update_member_error', error.error || `Server Error (${res.status})`);
                return false;
            }
        } catch (error: any) {
            console.error('[DataContext] Failed to update team member:', error);
            localStorage.setItem('last_update_member_error', error.message || 'Connection Error');
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
            console.log(`[DataContext] addTeamMember triggered with payload:`, JSON.stringify(member, null, 2));
            const res = await fetch('/api/members', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(member),
            });

            console.log(`[DataContext] API Response Status: ${res.status}`);

            if (res.ok) {
                const savedMember = await res.json();
                console.log(`[DataContext] API returned saved member:`, savedMember);

                // Normalization with robust fallback logic
                const serverFirmIds = savedMember.firmIds || [];
                const serverFirmId = savedMember.firmId || "";
                const normalizedFirmIds = serverFirmIds.length > 0
                    ? serverFirmIds
                    : (serverFirmId ? [serverFirmId] : []);
                const normalizedFirmId = serverFirmId || (normalizedFirmIds.length > 0 ? normalizedFirmIds[0] : "");

                const normalizedMember = {
                    ...savedMember,
                    order: savedMember.sortOrder ?? 0,
                    firmIds: normalizedFirmIds,
                    firmId: normalizedFirmId
                };

                setTeamMembers(prev => [normalizedMember, ...prev]);
                console.log(`[DataContext] State updated. Added: ${normalizedMember.name}`);

                addActivity({
                    type: 'MEMBER_ADDED',
                    title: `Added new team member: ${normalizedMember.name}`,
                    firmId: normalizedMember.firmId || ""
                });
                return normalizedMember;
            } else {
                const errorData = await res.json().catch(() => ({}));
                console.error(`[DataContext] API Add Failed: ${res.status}`, errorData);
                localStorage.setItem('last_add_member_error', errorData.error || `Server Error (${res.status})`);
                return null;
            }
        } catch (error) {
            console.error('[DataContext] Failed to add team member exception:', error);
            return null;
        }
    };

    // New user helpers
    const addUser = async (user: User) => {
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
            if (res.ok) {
                const savedUser = await res.json();
                setUsers(prev => [savedUser, ...prev]);
                addActivity({
                    type: 'USER_ADDED',
                    title: `Added user ${savedUser.email}`,
                    firmId: savedUser.firmId
                });
                return savedUser;
            }
            return null;
        } catch (error) {
            console.error('Failed to add user:', error);
            return null;
        }
    };

    const getUserById = (id: string) => users.find(u => u.id === id);
    const getUsersByFirmId = (firmId: string) => users.filter(u => u.firmId === firmId);

    const updateUser = async (id: string, updates: Partial<User>) => {
        try {
            const res = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });
            if (res.ok) {
                const updatedUser = await res.json();
                setUsers(prev => prev.map(u => u.id === id ? updatedUser : u));
                addActivity({
                    type: 'USER_UPDATED',
                    title: `Updated user info: ${updatedUser.email}`,
                    firmId: updatedUser.firmId
                });

                // Synchronize currentUser if the edited user is the one logged in
                if (currentUser?.id === id) {
                    setCurrentUser(updatedUser);
                    storage.setItem('prvtmkt_session', updatedUser);
                }
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to update user:', error);
            return false;
        }
    };

    const deleteUser = async (id: string) => {
        try {
            const user = users.find(u => u.id === id);
            const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
            if (res.ok) {
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
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const impersonateUser = async (user: User) => {
        if (currentUser?.role !== 'SYSTEM_ADMIN' && !originalAdminId) return;

        // If not already impersonating, save the original admin ID
        if (!originalAdminId) {
            setOriginalAdminId(currentUser?.id || null);
            storage.setItem('prvtmkt_original_admin_id', currentUser?.id);
        }

        setCurrentUser(user);
        storage.setItem('prvtmkt_session', user);

        addActivity({
            type: 'USER_IMPERSONATED',
            title: `System Admin is now impersonating ${user.email}`,
            firmId: user.firmId
        });

        // Determine Redirect Path
        const firm = firms.find(f => f.id === user.firmId);
        if (user.role === 'FIRM_ADMIN' && firm) {
            router.push(`/admin/${firm.slug}`);
        } else if (user.role === 'USER' && firm) {
            router.push(`/admin/${firm.slug}/profile`);
        } else {
            router.push('/admin');
        }
    };

    const stopImpersonation = async () => {
        const adminId = originalAdminId || await storage.getItem<string>('prvtmkt_original_admin_id');
        if (!adminId) return;

        const adminUser = users.find(u => u.id === adminId);
        if (adminUser) {
            setCurrentUser(adminUser);
            storage.setItem('prvtmkt_session', adminUser);
            setOriginalAdminId(null);
            storage.removeItem('prvtmkt_original_admin_id');

            addActivity({
                type: 'IMPERSONATION_STOPPED',
                title: `System Admin stopped impersonation of ${currentUser?.email}`,
                firmId: adminUser.firmId
            });

            router.push('/admin');
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

            addActivity({
                type: 'USER_ADDED',
                title: `Admin user created for firm: ${userData.email}`,
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
                addActivity({
                    type: 'DEAL_UPDATED',
                    title: `Updated deal: ${updatedDeal.address}`,
                    dealId: id,
                    firmId: updatedDeal.firmId
                });
                console.log('[DataContext] Deal updated successfully:', updatedDeal);
                return true;
            }
            const errorData = await res.json().catch(() => ({ message: 'Unknown error' }));
            console.error(`[DataContext] Failed to update deal ${id}:`, res.status, errorData);
            return false;
        } catch (error) {
            console.error(`[DataContext] Failed to update deal ${id}:`, error);
            return false;
        }
    };

    const deleteDeal = async (id: string) => {
        try {
            console.log(`[DataContext] Attempting to delete deal: ${id}`);
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
                console.log(`[DataContext] Deal ${id} deleted successfully.`);
            } else {
                const errorData = await res.json().catch(() => ({ message: 'Unknown error' }));
                console.error(`[DataContext] Failed to delete deal ${id}:`, res.status, errorData);
            }
        } catch (error) {
            console.error(`[DataContext] Failed to delete deal ${id}:`, error);
        }
    };

    const deleteFirm = async (id: string) => {
        try {
            console.log(`[DataContext] Attempting to delete firm: ${id}`);
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
                console.log(`[DataContext] Firm ${id} deleted successfully.`);
            } else {
                const errorData = await res.json().catch(() => ({ message: 'Unknown error' }));
                console.error(`[DataContext] Failed to delete firm ${id}:`, res.status, errorData);
            }
        } catch (error) {
            console.error(`[DataContext] Failed to delete firm ${id}:`, error);
        }
    };
    const reorderTeamMembers = async (reorderedMembers: TeamMember[]): Promise<boolean | string> => {
        const originalMembers = [...teamMembers];
        setTeamMembers(reorderedMembers);
        try {
            const response = await fetch('/api/members/reorder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ members: reorderedMembers.map(m => ({ id: m.id, order: m.order })) }),
            });
            if (!response.ok) throw new Error('Failed to persist order');
            return true;
        } catch (error: any) {
            setTeamMembers(originalMembers);
            return error.message || 'Ordering failed';
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

    const addActivity = async (activity: Omit<Activity, 'id' | 'timestamp'>) => {
        try {
            // Automatically inject current user info
            const activityWithUser = {
                ...activity,
                userId: activity.userId || currentUser?.id,
                performedByEmail: activity.performedByEmail || currentUser?.email
            };

            const res = await fetch('/api/activities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(activityWithUser),
            });
            if (res.ok) {
                const savedActivity = await res.json();
                setActivities(prev => [savedActivity, ...prev]);
            } else {
                // Fallback for local experience if server fails
                const localActivity: Activity = {
                    ...activityWithUser,
                    id: `act-${Date.now()}`,
                    timestamp: new Date().toISOString()
                };
                setActivities(prev => [localActivity, ...prev]);
            }
        } catch (error) {
            console.error('Failed to save activity:', error);
            const localActivity: Activity = {
                ...activity,
                id: `act-${Date.now()}`,
                timestamp: new Date().toISOString(),
                userId: currentUser?.id,
                performedByEmail: currentUser?.email
            };
            setActivities(prev => [localActivity, ...prev]);
        }
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
            reorderTeamMembers,
            deleteTeamMember,
            isInitialized,
            impersonateUser,
            stopImpersonation,
            isImpersonating: !!originalAdminId
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
