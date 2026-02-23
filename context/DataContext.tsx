"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_FIRMS, MOCK_DEALS } from '@/lib/mock-data';

interface Firm {
    id: string;
    name: string;
    slug: string;
    logoUrl: string;
    primaryColor: string;
}

interface Deal {
    id: string;
    firmId: string;
    address: string;
    assetType: string;
    strategy: string;
    purchaseAmount: number;
    financedAmount: number;
    stillImageURL: string;
    isPublic: boolean;
    capRate: number;
    sqFt: number;
    teamMemberId: string;
}

interface DataContextType {
    firms: Firm[];
    deals: Deal[];
    updateFirm: (id: string, updates: Partial<Firm>) => void;
    addDeal: (deal: Deal) => void;
    deleteDeal: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [firms, setFirms] = useState<Firm[]>(MOCK_FIRMS);
    const [deals, setDeals] = useState<Deal[]>(MOCK_DEALS);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedFirms = localStorage.getItem('prvtmkt_firms');
        const savedDeals = localStorage.getItem('prvtmkt_deals');

        if (savedFirms) {
            try {
                setFirms(JSON.parse(savedFirms));
            } catch (e) {
                console.error("Failed to parse saved firms", e);
            }
        }

        if (savedDeals) {
            try {
                setDeals(JSON.parse(savedDeals));
            } catch (e) {
                console.error("Failed to parse saved deals", e);
            }
        }

        setIsInitialized(true);
    }, []);

    // Save to localStorage when state changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('prvtmkt_firms', JSON.stringify(firms));
        }
    }, [firms, isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('prvtmkt_deals', JSON.stringify(deals));
        }
    }, [deals, isInitialized]);

    const updateFirm = (id: string, updates: Partial<Firm>) => {
        setFirms(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
    };

    const addDeal = (deal: Deal) => {
        setDeals(prev => [deal, ...prev]);
    };

    const deleteDeal = (id: string) => {
        setDeals(prev => prev.filter(d => d.id !== id));
    };

    return (
        <DataContext.Provider value={{ firms, deals, updateFirm, addDeal, deleteDeal }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}
