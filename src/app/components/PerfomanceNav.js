import React, { useState } from 'react';

const PerfomanceNav = () => {
    const [activeTab, setActiveTab] = useState('Overview');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <nav className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between">
                <div className="flex space-x-8">
                    <NavItem tab="Overview" activeTab={activeTab} onClick={handleTabClick} />
                    <NavItem tab="Fundamentals" activeTab={activeTab} onClick={handleTabClick} />
                    <NavItem tab="News Insights" activeTab={activeTab} onClick={handleTabClick} />
                    <NavItem tab="Sentiments" activeTab={activeTab} onClick={handleTabClick} />
                    <NavItem tab="Team" activeTab={activeTab} onClick={handleTabClick} />
                    <NavItem tab="Technicals" activeTab={activeTab} onClick={handleTabClick} />
                    <NavItem tab="Tokenomics" activeTab={activeTab} onClick={handleTabClick} />
                </div>
            </div>
            <hr className={activeTab ? 'border-blue-500' : 'border-gray-800'} />
        </nav>
    );
};

const NavItem = ({ tab, activeTab, onClick }) => {
    return (
        <div onClick={() => onClick(tab)} className={`cursor-pointer ${activeTab === tab ? 'text-blue-500' : ''}`}>
            {tab}
        </div>
    );
};

export default PerfomanceNav;
