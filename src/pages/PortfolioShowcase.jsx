import React from 'react';
import { useParams } from 'react-router-dom';

export default function PortfolioShowcase() {
    const { id } = useParams();

    return (
        <div className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 bg-dark text-background">
            <h1 className="font-drama italic text-5xl text-primary mb-8 tracking-tighter">Project Showcase: {id}</h1>
        </div>
    );
}
