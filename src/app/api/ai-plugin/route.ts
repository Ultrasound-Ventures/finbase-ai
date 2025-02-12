// src/app/api/ai-plugin/route.ts
import { NextResponse } from "next/server";
import { ACCOUNT_ID, PLUGIN_URL } from "@/app/config";

export async function GET() {
    const pluginData = {
        openapi: "3.0.0",
        info: {
            title: "Zanna.Finance AI",
            description: "Your intelligent blockchain research and analysis assistant",
            version: "1.0.0",
        },
        servers: [{ url: PLUGIN_URL }],
        "x-mb": {
            "account-id": ACCOUNT_ID,
            assistant: {
                name: "Zanna AI",
                description: "A blockchain research specialist that helps analyze and compare different blockchain platforms.",
                instructions: `You are Zanna AI, a blockchain analysis assistant. Help users understand:
                    1. Different blockchain platforms (L1s and L2s)
                    2. Platform comparisons and differences
                    3. Technical features and capabilities
                    4. Market trends and analysis
                    
                    When users ask about blockchains:
                    1. Use /api/tools/get-blockchains to fetch blockchain data
                    2. Provide informative comparisons
                    3. Explain technical concepts simply
                    4. Focus on user's specific interests`,
                tools: [{ type: "generate-transaction" }, { type: "generate-evm-tx" }]
            },
        },
        paths: {
            "/api/tools/get-blockchains": {
                get: {
                    summary: "Get blockchain information",
                    description: "Returns information about various blockchain platforms",
                    operationId: "get-blockchains",
                    parameters: [
                        {
                            name: "type",
                            in: "query",
                            description: "Filter by blockchain type (L1 or L2)",
                            required: false,
                            schema: { type: "string", enum: ["L1", "L2"] }
                        },
                        {
                            name: "category",
                            in: "query",
                            description: "Filter by category",
                            required: false,
                            schema: { 
                                type: "string", 
                                enum: ["Currency", "Smart Contract", "Scaling", "Interoperability"] 
                            }
                        },
                        {
                            name: "limit",
                            in: "query",
                            description: "Number of blockchains to return",
                            required: false,
                            schema: { type: "integer", minimum: 1, maximum: 20 }
                        },
                        {
                            name: "details",
                            in: "query",
                            description: "Include detailed information",
                            required: false,
                            schema: { type: "boolean" }
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            blockchains: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        name: { type: "string" },
                                                        type: { type: "string" },
                                                        category: { type: "string" }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    return NextResponse.json(pluginData);
}