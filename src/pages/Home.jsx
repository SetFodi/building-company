import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Philosophy from '../components/Philosophy';
import Protocol from '../components/Protocol';
import FlagshipAssets from '../components/FlagshipAssets';
import Footer from '../components/Footer';
import MetricsBar from '../components/MetricsBar';
import Firm from './Firm';
import PortfolioIndex from './PortfolioIndex';
import Inquiries from './Inquiries';

export default function Home() {
    return (
        <div className="w-full relative">
            <Hero />
            <MetricsBar />
            <Firm />
            <Features />
            <FlagshipAssets />
            <Protocol />
            <PortfolioIndex />
            <Philosophy />
            <Inquiries />
            <Footer />
        </div>
    );
}
