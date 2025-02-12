import BlockchainSection from '@/components/BlockchainSection';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/zanna.svg"
              alt="Zanna.Finance"
              width={32}
              height={32}
            />
            <span className="text-xl font-semibold">Zanna.Finance</span>
          </div>
          <div className="flex items-center gap-4">
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <BlockchainSection />
        
        {/* AI Assistant Section */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 bg-white rounded-lg border p-4">
              <div className="bg-[#ff3e3e] text-white px-3 py-1 rounded-full text-sm">
                ZANNA AI
              </div>
              <input
                type="text"
                placeholder="Ask about any blockchain..."
                className="flex-1 bg-transparent border-none focus:outline-none"
              />
              <button className="p-2 hover:bg-gray-100 rounded-full">
                ↑
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}