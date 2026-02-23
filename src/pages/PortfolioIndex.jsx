import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
    const cursorRef = useRef(null);
    const cursorImgRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.6, ease: "power3" });
            const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.6, ease: "power3" });

            const handleMouseMove = (e) => {
                xTo(e.clientX);
                yTo(e.clientY);
            };

            window.addEventListener("mousemove", handleMouseMove);

            const rows = gsap.utils.toArray('.portfolio-row');
            rows.forEach((row) => {
                row.addEventListener("mouseenter", (e) => {
                    const imgUrl = row.getAttribute('data-image');
                    cursorImgRef.current.src = imgUrl;
                    gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" });
                });
                row.addEventListener("mouseleave", () => {
                    gsap.to(cursorRef.current, { scale: 0.5, opacity: 0, duration: 0.4, ease: "power2.out" });
                });
            });

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };
        }, listRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={listRef} className="w-full min-h-screen pt-32 pb-48 bg-background text-dark relative selection:bg-accent selection:text-background overflow-hidden cursor-default md:cursor-crosshair">

            {/* Custom Cursor Image Container */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-[450px] aspect-[4/5] pointer-events-none z-0 rounded-[2rem] overflow-hidden opacity-0 scale-50 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply transition-shadow duration-500 shadow-2xl shadow-dark/20 hidden md:block"
            >
                <img ref={cursorImgRef} src="" alt="Preview" className="w-full h-full object-cover" />
            </div>

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
                        <Link
                            key={project.id}
                            to={`/portfolio/${project.id}`}
                            data-image={project.image}
                            className="portfolio-row group flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-16 border-b border-dark/10 hover:border-dark/30 transition-colors duration-500 relative cursor-pointer"
                        >
                            <h2 className="font-sans font-bold text-3xl md:text-5xl lg:text-6xl text-dark tracking-tighter mb-4 md:mb-0 transform transition-transform duration-500 group-hover:translate-x-6 origin-left">
                                {project.name}
                            </h2>

                            <div className="flex flex-row items-center justify-between md:justify-end gap-4 md:gap-16 w-full md:w-auto transform transition-transform duration-500 group-hover:-translate-x-6">
                                <span className="font-serif italic text-dark/50 text-base md:text-xl group-hover:text-dark transition-colors duration-500">
                                    {project.sector}
                                </span>
                                <span className="font-mono text-dark font-medium text-xs md:text-base border border-dark/10 px-4 py-2 rounded-full group-hover:border-dark/30 group-hover:bg-dark group-hover:text-background transition-all duration-500 text-right">
                                    {project.metric}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
