// src/app/api/tools/get-blockchains/types.ts

export interface BlockchainInfo {
    name: string;
    type?: 'L1' | 'L2' | 'Sidechain';
    category?: string;
    ecosystem?: string[];
}

export interface BlockchainResponse {
    blockchains: string[] | BlockchainInfo[];
    total: number;
    timestamp: string;
}