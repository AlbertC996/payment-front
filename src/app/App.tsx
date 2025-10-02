'use client';

import { useState } from 'react';
import { Gift } from 'lucide-react';

export function ApplePayModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [cardHolder, setCardHolder] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:opacity-90 transition-opacity"
      >
        Open Apple Pay Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="w-full max-w-md p-10 rounded-3xl bg-gradient-to-b from-[#313133] to-[#212123]">
            {/* Gift Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center">
                <Gift className="w-14 h-14 text-white" strokeWidth={1.5} />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-white text-2xl font-bold text-center mb-3">
              Apple Pay
            </h2>

            {/* Description */}
            <p className="text-white text-sm text-center mb-10 leading-relaxed px-2 opacity-90">
              Get that outstanding man the best gift, a night out with the
              future Browse back!
            </p>

            {/* Card Holder Input */}
            <div className="mb-5">
              <label
                htmlFor="cardHolder"
                className="text-white text-xs block mb-2 ml-1"
              >
                Card holder
              </label>
              <input
                id="cardHolder"
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder=""
                className="w-full bg-[#1a1b20] border-2 border-[#6f1c3a] rounded-full px-5 py-3.5 text-white text-sm placeholder-gray-400 shadow-[2px_2px_0_#bb6b88] transition-all duration-200"
              />
            </div>

            {/* Password Input */}
            <div className="mb-10">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1a1b20] border-2 border-[#6f1c3a] rounded-full px-5 py-3.5 text-white text-sm placeholder-gray-400 shadow-[2px_2px_0_#bb6b88] transition-all duration-200"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-5">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 py-3.5 rounded-full font-semibold text-sm border border-[#222025] bg-gradient-to-r from-[#3a373e] to-[#222025] text-[#e34874] 
                shadow-[0_0_25px_rgba(10,20,50,0.7),0_0_10px_rgba(255,255,255,0.5)] 
                text-shadow-[0_0_8px_#e34874] hover:text-[#ffebf8] transition-all duration-200"
              >
                Back
              </button>
              <button
                onClick={() =>
                  console.log('Login clicked', { cardHolder, password })
                }
                className="flex-1 py-3.5 rounded-full font-semibold text-sm border border-[#222025] bg-gradient-to-r from-[#3a373e] to-[#222025] text-[#e34874] 
                shadow-[0_0_25px_rgba(10,20,50,0.7),0_0_10px_rgba(255,255,255,0.5)] 
                text-shadow-[0_0_8px_#e34874] hover:text-[#ffebf8] transition-all duration-200"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
