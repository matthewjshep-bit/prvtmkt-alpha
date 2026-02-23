export const MOCK_FIRMS = [
    {
        id: "f1",
        name: "Grand Peaks",
        slug: "grand-peaks",
        logoUrl: "https://www.grandpeaks.com/wp-content/themes/grandpeaks/assets/images/logo.png",
        primaryColor: "#c5a059",
        bio: "Institutional investment firm focused on the acquisition and management of luxury multifamily communities.",
        backgroundColor: "#0a0a0a",
        fontColor: "#ffffff",
        showAgencyBranding: true
    },
    {
        id: "f2",
        name: "PRVT MKT Capital",
        slug: "prvt-mkt",
        logoUrl: "/master-logo.png",
        primaryColor: "#c5a059",
        bio: "Private market capital specialists providing exclusive access to curated real estate investment opportunities.",
        backgroundColor: "#050505",
        fontColor: "#ffffff",
        showAgencyBranding: true
    }
];

export const MOCK_TEAM_MEMBERS = [
    {
        id: "cm1",
        firmId: "f2",
        name: "Michael Chen",
        slug: "michael-chen",
        role: "Acquisitions Associate",
        email: "michael@prvtmkt.com",
        imageURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
        bio: "Michael leads the acquisitions team with a focus on value-add multifamily assets across the Sunbelt region.",
    },
    {
        id: "cm2",
        firmId: "f2",
        name: "Sarah Jenkins",
        slug: "sarah-jenkins",
        role: "Director of Capital Markets",
        email: "sarah@prvtmkt.com",
        imageURL: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
        bio: "Sarah oversees all financing activities and equity relationships for PRVT MKT.",
    },
];

export const MOCK_DEALS = [
    {
        id: "d1",
        firmId: "f2",
        address: "123 Industrial Way, Dallas, TX",
        assetType: "INDUSTRIAL",
        strategy: "BUY_AND_HOLD",
        purchaseAmount: 12500000,
        financedAmount: 8750000,
        stillImageURL: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
        isPublic: true,
        capRate: 5.2,
        sqFt: 45000,
        teamMemberId: "cm1",
    },
    {
        id: "d2",
        firmId: "f2",
        address: "The Vue Apartments, Scottsdale, AZ",
        assetType: "MULTIFAMILY",
        strategy: "BUY_AND_HOLD",
        purchaseAmount: 32000000,
        financedAmount: 22400000,
        stillImageURL: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
        isPublic: true,
        capRate: 4.8,
        sqFt: 125000,
        teamMemberId: "cm1",
    },
    {
        id: "d3",
        firmId: "f2",
        address: "Westside Retail Plaza, Denver, CO",
        assetType: "RETAIL",
        strategy: "FIX_FLIP",
        purchaseAmount: 8900000,
        financedAmount: 6200000,
        stillImageURL: "https://images.unsplash.com/photo-1555624106-22e47a14b093?q=80&w=800&auto=format&fit=crop",
        isPublic: false,
        capRate: 6.1,
        sqFt: 18000,
        teamMemberId: "cm1",
    },
];
