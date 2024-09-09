import React from 'react';
import ReusableTile from './ReusableTile';

const Tokenomics: React.FC = () => {
  const data = [
    { x: '20%', y: 20 },
    { x: '80%', y: 80 },
  ];
  const colorScale = ['#FFA500', '#1E90FF'];

  const description = `"Tokenomics" is a comprehensive exploration of the economic landscape within the cryptocurrency realm. Delving into the intricate interplay of digital currencies, blockchain technology, and global financial systems, Cryptonomics offers insights into market trends, investment strategies, and the broader impact of cryptocurrencies on the economy. From understanding the fundamentals of tokenomics to navigating the dynamic nature of decentralized finance (DeFi), Cryptonomics equips readers with the knowledge needed to navigate the ever-evolving world of digital assets. Whether you're a seasoned investor, a blockchain enthusiast, or simply curious about the future of money, Cryptonomics provides a holistic perspective on the economic forces shaping the crypto landscape.`;

  return (
    <div className="hidden lg:block">
      <ReusableTile title="Tokenomics">
        <div className="font-semibold text-lg">Initial Distribution</div>

        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div className="h-56">
          </div>
          <div className="self-center text-gray-600">
            <div className="flex items-center mb-2">
              <div className="h-4 w-4 rounded-full bg-[#1E90FF] mr-2"></div>
              <div>Crowdsale Investors: 80%</div>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-[#FFA500] mr-2"></div>
              <div>Foundation: 20%</div>
            </div>
          </div>
        </div>

        <div className="text-gray-600 mb-6">{description}</div>
      </ReusableTile>
    </div>
  );
};

export default Tokenomics;
