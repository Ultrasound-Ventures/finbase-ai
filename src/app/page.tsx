// src/app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <Image
          src="/zanna.svg"
          alt="Zanna.Finance"
          width={150}
          height={40}
          priority
        />
        <div className="flex items-center gap-4">
          <span className="text-gray-600">chilumba.near</span>
          <button className="bg-white text-gray-800 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
            Connect EVM Wallet
          </button>
          <button className="bg-white text-gray-800 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
            Disconnect
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center p-8 gap-8">
        <div className="w-full max-w-3xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              Unlock Your
              <span className="text-[#ff3e3e] block">Financial Potential</span>
            </h1>
            <p className="text-gray-600 mb-8">
              From quick payments to smart investments, empower your financial journey with tools that work as hard as you do.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-[#fff1f1] p-4 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <span className="text-[#ff3e3e]">5s</span>
              </div>
              <p className="text-sm text-gray-600">Settlement</p>
            </div>
            <div className="text-center">
              <div className="bg-[#fff1f1] p-4 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <span className="text-[#ff3e3e]">99.9%</span>
              </div>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="bg-[#fff1f1] p-4 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <span className="text-[#ff3e3e]">24/7</span>
              </div>
              <p className="text-sm text-gray-600">Real-time</p>
            </div>
          </div>

          {/* Zanna AI Assistant */}
          <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-4 border border-gray-100">
            <span className="bg-[#ff3e3e] text-white px-4 py-1 rounded-full text-sm font-medium">
              ZANNA AI
            </span>
            <input
              type="text"
              placeholder="How can I help you with your finances today?"
              className="flex-1 bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400"
            />
            <button className="bg-[#ff3e3e] text-white rounded-full p-2 hover:bg-[#e63636] transition-colors">
              ↑
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 flex justify-center items-center gap-6 text-sm text-gray-500 border-t border-gray-100">
        <a href="#" className="hover:text-[#ff3e3e] transition-colors">Features</a>
        <a href="#" className="hover:text-[#ff3e3e] transition-colors">Specifications</a>
        <a href="#" className="hover:text-[#ff3e3e] transition-colors">Contact</a>
      </footer>
    </div>
  );
}