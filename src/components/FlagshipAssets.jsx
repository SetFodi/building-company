import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FlagshipAssets = () => {
    const sectionRef = useRef(null);
    const wrapperRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const panels = gsap.utils.toArray('.flagship-panel');

            // Apply will-change to optimize paint during scroll
            gsap.set(panels, { willChange: "transform" });

            gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + wrapperRef.current.offsetWidth
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const assets = [
        {
            title: "Olympus Trading Floors",
            location: "London, UK",
            roi: "14.2% IRR",
            leed: "LEED Platinum",
            speed: "Leased 90 Days Pre-Completion",
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2600",
            desc: "A cornerstone commercial acquisition. Redefining the financial district's skyline while establishing unprecedented environmental efficiency standards for institutional tenants."
        },
        {
            title: "Aether Residential",
            location: "Dubai, UAE",
            roi: "18.5% IRR",
            leed: "BREEAM Outstanding",
            speed: "100% Sold Out Pre-Launch",
            image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2600",
            desc: "Ultra-luxury high-rise combining biophilic design with absolute privacy. Record-breaking acquisition velocity upon private market release to UHNWIs."
        },
        {
            title: "The Vertex Complex",
            location: "Tokyo, JP",
            roi: "11.8% Yield",
            leed: "CASBEE S Rank",
            speed: "Anchor Tenant: Global Tech",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2600",
            desc: "A massive mixed-use development serving as a central hub for technological innovation. Fully leased to global enterprise partners securing 10-year stable yields."
        }
    ];

    return (
        <section ref={sectionRef} className="flagship-section relative w-full h-screen overflow-hidden bg-background text-dark z-20 border-t border-dark/10">
            {/* Header overlay */}
            <div className="absolute top-8 left-6 md:top-12 md:left-12 lg:left-24 z-50 pointer-events-none">
                <h2 className="font-drama italic text-3xl md:text-5xl lg:text-5xl text-primary drop-shadow-sm">Flagship Assets.</h2>
                <div className="flex items-center gap-2 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    <span className="text-[10px] font-sans tracking-widest uppercase text-dark/50 mt-0.5">Verified Case Studies</span>
                </div>
            </div>

            <div ref={wrapperRef} className="flex h-full w-[300vw]">
                {assets.map((asset, i) => (
                    <div key={i} className="flagship-panel w-screen h-full flex flex-col md:flex-row relative">

                        {/* Text Half */}
                        <div className="w-full md:w-[45%] lg:w-[40%] h-[50%] md:h-full flex flex-col justify-end p-8 md:p-16 lg:p-24 bg-background relative z-10 border-r border-dark/10 shadow-2xl">
                            <div className="max-w-xl md:mb-12">
                                <h3 className="font-sans font-bold text-3xl md:text-5xl lg:text-5xl xl:text-6xl text-dark mb-4 tracking-tighter leading-[0.9]">{asset.title}</h3>
                                <p className="font-sans text-lg md:text-xl text-dark/70 tracking-wide mb-6">{asset.location}</p>
                                <p className="font-serif italic text-dark/70 text-lg md:text-xl leading-relaxed mb-8 md:mb-12 hidden md:block">
                                    {asset.desc}
                                </p>

                                <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-dark/10 pt-6 mt-4 md:mt-0">
                                    <div>
                                        <p className="font-mono text-lg md:text-xl text-accent mb-1">{asset.roi}</p>
                                        <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-widest text-dark/40 font-bold">Projected Return</p>
                                    </div>
                                    <div>
                                        <p className="font-mono text-lg md:text-xl text-dark mb-1">{asset.leed}</p>
                                        <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-widest text-dark/40 font-bold">Environmental</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="font-mono text-sm md:text-base text-dark mb-1">{asset.speed}</p>
                                        <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-widest text-dark/40 font-bold">Acquisition Velocity</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Image Half */}
                        <div className="w-full md:w-[55%] lg:w-[60%] h-[50%] md:h-full relative overflow-hidden bg-dark">
                            <img src={asset.image} alt={asset.title} className="w-full h-full object-cover opacity-90 scale-105" />
                            {/* Inner inset shadow for premium feel */}
                            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] pointer-events-none"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FlagshipAssets;
