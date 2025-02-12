// src/components/BlockchainSection.tsx
import React, { useState, useEffect } from 'react';

interface Blockchain {
  name: string;
  type: 'L1' | 'L2';
  category: 'Currency' | 'Smart Contract' | 'Scaling' | 'Interoperability';
}

interface Filter {
  type: string;
  category: string;
}

const BlockchainSection: React.FC = () => {
  const [blockchains, setBlockchains] = useState<Blockchain[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>({ type: '', category: '' });

  useEffect(() => {
    fetchBlockchains();
  }, [filter]);

  const fetchBlockchains = async () => {
    try {
      const params = new URLSearchParams();
      if (filter.type) params.append('type', filter.type);
      if (filter.category) params.append('category', filter.category);
      params.append('details', 'true');
      params.append('limit', '6');

      const response = await fetch(`/api/tools/get-blockchains?${params}`);
      const data = await response.json();
      setBlockchains(data.blockchains);
    } catch (error) {
      console.error('Error fetching blockchains:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: 'L1' | 'L2'): string => {
    return type === 'L1' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  const getCategoryColor = (category: Blockchain['category']): string => {
    const colors = {
      'Currency': 'bg-green-100 text-green-800',
      'Smart Contract': 'bg-indigo-100 text-indigo-800',
      'Scaling': 'bg-pink-100 text-pink-800',
      'Interoperability': 'bg-orange-100 text-orange-800'
    } as const;
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Blockchain Explorer</h2>
          <p className="text-gray-600">Explore and analyze different blockchain platforms</p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-4">
          <select 
            className="bg-white border rounded-lg px-4 py-2"
            value={filter.type}
            onChange={(e) => setFilter(prev => ({ ...prev, type: e.target.value }))}
          >
            <option value="">All Types</option>
            <option value="L1">Layer 1</option>
            <option value="L2">Layer 2</option>
          </select>
          
          <select 
            className="bg-white border rounded-lg px-4 py-2"
            value={filter.category}
            onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="">All Categories</option>
            <option value="Currency">Currency</option>
            <option value="Smart Contract">Smart Contract</option>
            <option value="Scaling">Scaling</option>
            <option value="Interoperability">Interoperability</option>
          </select>
        </div>
      </div>

      {/* Blockchain Grid */}
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blockchains.map((blockchain, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{blockchain.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(blockchain.type)}`}>
                  {blockchain.type}
                </span>
              </div>
              
              <div className="space-y-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${getCategoryColor(blockchain.category)}`}>
                  {blockchain.category}
                </span>
                
                <div className="flex justify-between text-sm text-gray-600">
                  <button 
                    onClick={() => {
                      const message = `Tell me about ${blockchain.name} blockchain`;
                      // You can implement the chat interaction here
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Ask Zanna AI →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlockchainSection;