// src/app/api/tools/get-blockchains/utils.ts

export function getRandomBlockchains(blockchains: string[], limit: number = 3): string[] {
    return [...blockchains]
        .sort(() => 0.5 - Math.random())
        .slice(0, limit);
}

export function parseLimit(limitParam: string | null): number {
    const limit = parseInt(limitParam || '3', 10);
    return isNaN(limit) ? 3 : Math.max(1, Math.min(limit, 10));
}