import React, { useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import TransitionLink from '../components/TransitionLink';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ... rest of imports stay the same

const projectDB = {
    // ... same as before

    vertex: {
        name: 'The Vertex Complex',
        sector: 'Mixed-Use / Active',
        heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2600',
        quote: "Redefining urban ecology by integrating high-density infrastructure with sustainable biological systems.",
        thesis: "The Vertex Complex is a testament to the intersection of brutalist efficiency and organic adaptability. By centralizing life-science hubs with luxury residential zoning, Comfort Building has engineered a self-sustaining micro-economy.",
        images: [
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200'
        ],
        esg: [
            { label: 'Energy Reduction', value: '45%' },
            { label: 'Water Recycling', value: '100%' },
            { label: 'Carbon Offset', value: 'Net Zero' },
            { label: 'Material Sourcing', value: '90% Local' }
        ],
        financials: [
            { year: '2022', irr: '11.2%', occ: '88%', val: '$0.8B' },
            { year: '2023', irr: '12.4%', occ: '94%', val: '$1.2B' },
            { year: '2024', irr: '14.1%', occ: '98%', val: '$1.5B' }
        ]
    },
    aether: {
        name: 'Aether Residential',
        sector: 'Residential / Delivered',
        heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2600',
        quote: "Uncompromising residential luxury designed for absolute privacy and panoramic immersion.",
        thesis: "Aether Residential eliminates the boundary between interior sanctuary and external horizon. Featuring floor-to-ceiling smart glass, biometric secure elevators, and concierge-level structural management, Aether is the standard for ultra-high-net-worth living.",
        images: [
            'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200'
        ],
        esg: [
            { label: 'Smart Climate Control', value: 'AI Driven' },
            { label: 'Noise Insulation', value: 'Zero dB' },
            { label: 'Energy Source', value: '100% Geothermal' },
            { label: 'Resident Wellbeing', value: 'WELL Certified' }
        ],
        financials: [
            { year: '2022', irr: '9.8%', occ: '100%', val: '$450M' },
            { year: '2023', irr: '10.5%', occ: '100%', val: '$510M' },
            { year: '2024', irr: '11.2%', occ: '100%', val: '$580M' }
        ]
    },
    olympus: {
        name: 'Olympus Trading Floors',
        sector: 'Commercial / Active',
        heroImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2600',
        quote: "Data-driven commercial architecture built to withstand the kinetic velocity of global markets.",
        thesis: "Housing three of the world's leading quantitative trading firms, Olympus provides hyper-cooled server infrastructure mapped directly into the structural columns, reducing latency while maximizing Class-A office aesthetic.",
        images: [
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200'
        ],
        esg: [
            { label: 'Cooling Efficiency', value: 'PUE 1.1' },
            { label: 'Data Security', value: 'Tier IV' },
            { label: 'Grid Independence', value: '72 Hours' },
            { label: 'Lighting', value: 'Circadian LED' }
        ],
        financials: [
            { year: '2023', irr: '13.5%', occ: '92%', val: '$1.8B' },
            { year: '2024', irr: '14.2%', occ: '100%', val: '$2.1B' }
        ]
    },
    nexus: {
        name: 'Nexus Bioscience',
        sector: 'Life Sciences / Planning',
        heroImage: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=2600',
        quote: "Clinical precision scaled to monumental proportions.",
        thesis: "Designed specifically for genomic sequencing and pharmaceutical development, Nexus features modular wet-lab zoning, intense vibration isolation, and hospital-grade air filtration systems woven into a monumental glass facade.",
        images: [
            'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200'
        ],
        esg: [
            { label: 'Air Filtration', value: 'HEPA 99.9%' },
            { label: 'Vibration Control', value: 'VC-A Standard' },
            { label: 'Chemical Disposal', value: 'Zero-Leak' },
            { label: 'Bio-Safety', value: 'Level 3 Ready' }
        ],
        financials: [
            { year: '2024 Phase 1', irr: 'Target 16%', occ: 'Pre-leased', val: '$900M' }
        ]
    },
    solaris: {
        name: 'Solaris Vertical',
        sector: 'Mixed-Use / Delivered',
        heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2600',
        quote: "A monolithic capture of renewable energy disguised as a luxury urban core.",
        thesis: "Solaris features a groundbreaking photovoltaic structural skin that generates power while providing passive shade. It serves as a visual and functional beacon of what post-carbon architecture can be.",
        images: [
            'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1473172081708-5adfc3f590dc?auto=format&fit=crop&q=80&w=1200'
        ],
        esg: [
            { label: 'Energy Capture', value: '2.5 GWh/yr' },
            { label: 'Facade', value: 'Active Solar' },
            { label: 'Heating', value: 'Passive Solar' },
            { label: 'Certification', value: 'LEED Platinum' }
        ],
        financials: [
            { year: '2022', irr: '10.1%', occ: '95%', val: '$850M' },
            { year: '2023', irr: '11.4%', occ: '98%', val: '$920M' },
            { year: '2024', irr: '12.8%', occ: '100%', val: '$1.05B' }
        ]
    }
};

export default function PortfolioShowcase() {
    const { id } = useParams();
    const project = projectDB[id] || projectDB['vertex'];

    const mainRef = useRef(null);
    const heroRef = useRef(null);
    const splitRef = useRef(null);
    const stickyTextRef = useRef(null);
    const esgRef = useRef(null);

    useLayoutEffect(() => {
        // Immediately scroll to top on mount when route changes
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {

            // Phase 1: Hero Parallax
            gsap.to('.hero-bg-img', {
                yPercent: 30,
                scale: 1.15,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Phase 2: 50/50 Sticky Split
            ScrollTrigger.create({
                trigger: splitRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: stickyTextRef.current,
                pinSpacing: false
            });

            // Phase 3: ESG SVG Lines
            const lines = gsap.utils.toArray('.svg-line');
            lines.forEach((line) => {
                const length = line.getTotalLength();
                gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

                gsap.to(line, {
                    strokeDashoffset: 0,
                    duration: 2,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: esgRef.current,
                        start: "top 70%",
                        once: true
                    }
                });
            });

        }, mainRef);
        return () => ctx.revert();
    }, [id]);

    return (
        <div ref={mainRef} className="w-full relative bg-background text-dark overflow-x-hidden">

            {/* Phase 1: Immersion Hero */}
            <section ref={heroRef} className="relative w-full h-[100dvh] overflow-hidden flex items-end pb-24 px-6 md:px-12 rounded-b-[4rem] z-20 shadow-2xl">
                <div className="absolute inset-0 bg-dark z-0">
                    <img src={project.heroImage} alt={project.name} className="hero-bg-img w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col">
                    <p className="font-mono text-primary tracking-widest text-sm md:text-base mb-6 uppercase">
                        [{project.sector}]
                    </p>
                    <h1 className="font-sans font-bold text-6xl md:text-8xl lg:text-[10vw] text-background tracking-tighter leading-none mb-4 mix-blend-difference">
                        {project.name}
                    </h1>
                </div>
            </section>

            {/* Phase 2: The Executive Summary (50/50 Split) */}
            <section ref={splitRef} className="relative w-full bg-background z-10">
                <div className="w-full flex flex-col md:flex-row relative max-w-[1600px] mx-auto">

                    {/* Left Sticky Block */}
                    <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-24 relative h-auto md:h-[100dvh]">
                        <div ref={stickyTextRef} className="w-full md:w-auto pt-12 md:pt-32">
                            <h2 className="font-drama italic text-3xl md:text-5xl lg:text-5xl text-dark leading-tight mb-12 max-w-xl">
                                "{project.quote}"
                            </h2>
                            <p className="font-sans text-dark/70 text-lg md:text-xl leading-relaxed max-w-md mb-12">
                                {project.thesis}
                            </p>
                            <TransitionLink to="/portfolio" className="magnetic-btn inline-flex bg-dark text-background px-8 py-3 rounded-full text-sm font-medium group">
                                <span className="magnetic-btn-bg bg-primary"></span>
                                <span className="relative z-10 flex items-center gap-2">
                                    Return to Archive
                                </span>
                            </TransitionLink>
                        </div>
                    </div>

                    {/* Right Scrolling Images Block */}
                    <div className="w-full md:w-1/2 flex flex-col bg-background/50 border-l border-dark/5 p-6 md:p-12 lg:p-24 pb-32">
                        {project.images.map((img, i) => (
                            <div key={i} className="w-full aspect-[4/5] object-cover rounded-[2rem] overflow-hidden mb-12 last:mb-0 shadow-xl shadow-dark/5">
                                <img src={img} alt={`${project.name} detail ${i}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Phase 3: ESG & Structural Specs */}
            <section ref={esgRef} className="relative w-full py-32 bg-dark text-background overflow-hidden selection:bg-primary selection:text-dark">
                <svg className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="none" fill="none" stroke="currentColor">
                    <path className="svg-line" d="M -100 200 L 400 200 L 600 400 L 1100 400" strokeWidth="2" />
                    <path className="svg-line" d="M 200 -100 L 200 1100" strokeWidth="1" strokeDasharray="10 10" />
                    <path className="svg-line" d="M 800 -100 L 800 1100" strokeWidth="0.5" />
                    <circle className="svg-line" cx="600" cy="400" r="50" strokeWidth="1" />
                    <circle className="svg-line" cx="600" cy="400" r="100" strokeWidth="0.5" strokeDasharray="5 5" />
                </svg>

                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row justify-between items-start gap-16">
                    <div className="w-full md:w-1/3">
                        <span className="font-mono text-primary text-lg mb-4 block">[03]</span>
                        <h2 className="font-sans font-bold text-4xl md:text-5xl tracking-tighter mb-8">Structural & ESG Schematics.</h2>
                    </div>

                    <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                        {project.esg.map((item, i) => (
                            <div key={i} className="flex flex-col border-b border-background/20 pb-6 w-full group">
                                <span className="font-mono text-background/50 text-sm mb-4">{item.label}</span>
                                <span className="font-drama italic text-4xl md:text-5xl text-background group-hover:text-primary transition-colors">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Phase 4: Financial Ledger (ROI) */}
            <section className="relative w-full py-32 bg-background text-dark px-6 md:px-12">
                <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
                    <span className="font-mono text-primary text-sm tracking-widest uppercase mb-12 block">Asset Valuation & Yield</span>

                    <div className="w-full flex-col font-mono text-sm md:text-base hidden sm:flex">
                        <div className="grid grid-cols-4 border-b-2 border-dark/20 pb-4 mb-4 text-dark/50 font-bold uppercase tracking-widest">
                            <div>Fiscal Year</div>
                            <div>Internal Rate (IRR)</div>
                            <div>Occupancy</div>
                            <div className="text-right">Valuation Target</div>
                        </div>

                        {project.financials.map((fin, i) => (
                            <div key={i} className="grid grid-cols-4 py-6 border-b border-dark/10 hover:bg-dark/5 hover:-translate-y-1 transition-all duration-300 px-4 -mx-4 rounded-xl cursor-default items-center">
                                <div className="font-bold text-lg">{fin.year}</div>
                                <div className="text-primary">{fin.irr}</div>
                                <div>{fin.occ}</div>
                                <div className="text-right font-bold text-lg">{fin.val}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-24 text-center">
                        <button className="magnetic-btn bg-dark text-background px-10 py-5 rounded-full text-base font-medium group">
                            <span className="magnetic-btn-bg bg-primary"></span>
                            <span className="relative z-10 flex items-center gap-2">
                                Request Deal Room Access
                            </span>
                        </button>
                    </div>

                </div>
            </section>

        </div>
    );
}
