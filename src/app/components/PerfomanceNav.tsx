'use client';
import React, { useState } from 'react';
import { perfomanceNav } from '../data/perfomanceNav'; 

const PerfomanceNav: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('Overview');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <nav className="text-gray-600 py-4 mt-4 text-xs lg:text-base overflow-auto">
            <div className="container mx-auto flex justify-between">
                <div className="flex space-x-8">
                    {perfomanceNav.map((navItem, idx) =>
                        <NavItem key={idx} tab={navItem.title} activeTab={activeTab} onClick={handleTabClick} />
                    )}
                </div>
            </div>
            <hr className='border-gray-400' />
        </nav>
    );
};

interface NavItemProps {
    tab: string,
    activeTab: string,
    onClick: (tab: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ tab, activeTab, onClick }) => {
    return (
        <div onClick={() => onClick(tab)} className={`cursor-pointer ${activeTab === tab ? 'text-blue-700 font-semibold border-b-2 border-blue-500' : ''}`}>
            {tab}
        </div>
    );
};

export default PerfomanceNav;
