// src/app/api/tools/get-blockchains/route.ts
import { NextResponse } from 'next/server';

type BlockchainType = 'L1' | 'L2';
type BlockchainCategory = 'Currency' | 'Smart Contract' | 'Scaling' | 'Interoperability';

interface BlockchainInfo {
    type: BlockchainType;
    category: BlockchainCategory;
}

type BlockchainDataType = {
    [key: string]: BlockchainInfo;
}

const blockchainData: BlockchainDataType = {
    'Bitcoin': { type: 'L1', category: 'Currency' },
    'Ethereum': { type: 'L1', category: 'Smart Contract' },
    'Cardano': { type: 'L1', category: 'Smart Contract' },
    'Polkadot': { type: 'L1', category: 'Interoperability' },
    'Solana': { type: 'L1', category: 'Smart Contract' },
    'Avalanche': { type: 'L1', category: 'Smart Contract' },
    'Binance Smart Chain': { type: 'L1', category: 'Smart Contract' },
    'Tezos': { type: 'L1', category: 'Smart Contract' },
    'Algorand': { type: 'L1', category: 'Smart Contract' },
    'Cosmos': { type: 'L1', category: 'Interoperability' },
    'Near': { type: 'L1', category: 'Smart Contract' },
    'Aptos': { type: 'L1', category: 'Smart Contract' },
    'Sui': { type: 'L1', category: 'Smart Contract' },
    'Starknet': { type: 'L2', category: 'Scaling' },
    'ZKsync': { type: 'L2', category: 'Scaling' },
    'Scroll': { type: 'L2', category: 'Scaling' },
    'Optimism': { type: 'L2', category: 'Scaling' },
    'Arbitrum': { type: 'L2', category: 'Scaling' }
};

const blockchains = Object.keys(blockchainData);

function validateLimit(limitParam: string | null): number {
    if (!limitParam) return 3;
    const limit = parseInt(limitParam, 10);
    if (isNaN(limit) || limit < 1) return 3;
    return limit;
}

function filterBlockchains(
    chains: string[], 
    type?: BlockchainType,
    category?: BlockchainCategory
): string[] {
    return chains.filter(chain => {
        const data = blockchainData[chain];
        if (type && data.type !== type) return false;
        if (category && data.category !== category) return false;
        return true;
    });
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = validateLimit(searchParams.get('limit'));
        const type = searchParams.get('type') as BlockchainType | undefined;
        const category = searchParams.get('category') as BlockchainCategory | undefined;
        const details = searchParams.get('details') === 'true';

        let filteredChains = filterBlockchains(blockchains, type, category);
        let randomBlockchains = [...filteredChains]
            .sort(() => 0.5 - Math.random())
            .slice(0, limit);

        const response = {
            blockchains: details 
                ? randomBlockchains.map(chain => ({
                    name: chain,
                    ...blockchainData[chain]
                }))
                : randomBlockchains,
            total: filteredChains.length,
            timestamp: new Date().toISOString(),
            available_filters: {
                types: ['L1', 'L2'] as BlockchainType[],
                categories: [
                    'Currency',
                    'Smart Contract',
                    'Scaling',
                    'Interoperability'
                ] as BlockchainCategory[]
            }
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            blockchains: [],
            total: 0,
            timestamp: new Date().toISOString(),
            error: 'Failed to fetch blockchain data'
        });
    }
}