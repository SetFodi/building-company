import React, { useLayoutEffect, useRef } from 'react';
import TransitionLink from '../components/TransitionLink';
import gsap from 'gsap';

const projects = [
    { id: 'vertex', name: 'The Vertex Complex', sector: 'Mixed-Use / Active', metric: '2.1M Sq Ft', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2600' },
    { id: 'aether', name: 'Aether Residential', sector: 'Residential / Delivered', metric: '100% Leased', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2600' },
    { id: 'olympus', name: 'Olympus Trading Floors', sector: 'Commercial / Active', metric: '14.2% IRR', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2600' },
    { id: 'nexus', name: 'Nexus Bioscience', sector: 'Life Sciences / Planning', metric: 'LEED Platinum', image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=2600' },
    { id: 'solaris', name: 'Solaris Vertical', sector: 'Mixed-Use / Delivered', metric: '850M Valuation', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2600' }
];

export default function PortfolioIndex() {
    const listRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const rows = gsap.utils.toArray('.portfolio-row');

            rows.forEach((row) => {
                const imgContainer = row.querySelector('.img-container');
                const img = row.querySelector('.portfolio-img');

                // Initialize styles to prevent jumping before GSAP takes over
                gsap.set(imgContainer, { height: 0, marginTop: 0 });
                gsap.set(img, { scale: 1.15, yPercent: -10 });

                row.expandAnim = gsap.to(imgContainer, {
                    height: window.innerWidth > 1024 ? 500 : (window.innerWidth > 768 ? 400 : 250),
                    marginTop: window.innerWidth > 768 ? 40 : 20,
                    duration: 0.85,
                    ease: "power3.inOut",
                    paused: true
                });

                row.scaleAnim = gsap.to(img, {
                    scale: 1,
                    yPercent: 0,
                    duration: 0.85,
                    ease: "power3.inOut",
                    paused: true
                });

                row.addEventListener("mouseenter", () => {
                    row.expandAnim.play();
                    row.scaleAnim.play();
                });

                row.addEventListener("mouseleave", () => {
                    row.expandAnim.reverse();
                    row.scaleAnim.reverse();
                });
            });

        }, listRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={listRef} className="w-full min-h-screen pt-32 pb-48 bg-background text-dark relative selection:bg-accent selection:text-background">

            <div className="px-6 md:px-12 w-full max-w-7xl mx-auto relative z-10">
                <div className="mb-24 mt-12 md:mt-20">
                    <h1 className="font-sans font-bold text-5xl md:text-8xl lg:text-9xl text-dark tracking-tighter leading-none mb-8">Asset Archive.</h1>
                    <p className="font-mono text-dark/70 tracking-widest text-xs md:text-sm uppercase flex flex-wrap gap-4 md:gap-12 border-b border-dark/10 pb-8 font-medium">
                        <span>Total Assets: 12</span>
                        <span>Total AUM: $4.2B</span>
                        <span>Global Scope</span>
                    </p>
                </div>

                <div className="flex flex-col border-t border-dark/10">
                    {projects.map((project) => (
                        <TransitionLink
                            key={project.id}
                            to={`/portfolio/${project.id}`}
                            className="portfolio-row group flex flex-col py-8 md:py-12 border-b border-dark/10 hover:border-dark/30 transition-colors duration-500 relative cursor-pointer"
                        >
                            {/* Hover slide background */}
                            <div className="absolute inset-0 bg-dark/5 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] -z-10"></div>

                            {/* Top Text Row */}
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full px-4 md:px-8">
                                <h2 className="font-sans font-bold text-3xl md:text-5xl lg:text-6xl text-dark tracking-tighter mb-4 md:mb-0 transform transition-transform duration-700 ease-out group-hover:translate-x-4">
                                    {project.name}
                                </h2>

                                <div className="flex flex-row items-center justify-between md:justify-end gap-4 md:gap-16 w-full md:w-auto transform transition-transform duration-700 ease-out group-hover:-translate-x-4">
                                    <span className="font-serif italic text-dark/50 text-base md:text-xl group-hover:text-dark transition-colors duration-500">
                                        {project.sector}
                                    </span>
                                    <span className="font-mono text-dark font-medium text-xs md:text-base border border-dark/10 px-4 py-2 rounded-full group-hover:border-dark/30 group-hover:bg-dark group-hover:text-background transition-all duration-500 text-right">
                                        {project.metric}
                                    </span>
                                </div>
                            </div>

                            {/* Expandable Image Accordion */}
                            <div className="img-container w-full overflow-hidden px-4 md:px-8">
                                <div className="w-full h-full relative rounded-2xl md:rounded-[2rem] overflow-hidden bg-dark shadow-inset-image">
                                    <div className="absolute inset-0 bg-dark/20 z-10 mix-blend-multiply transition-colors duration-700 group-hover:bg-transparent"></div>
                                    <img src={project.image} alt={project.name} className="portfolio-img w-full h-full object-cover origin-center" />
                                </div>
                            </div>

                        </TransitionLink>
                    ))}
                </div>
            </div>
        </div>
    );
}
