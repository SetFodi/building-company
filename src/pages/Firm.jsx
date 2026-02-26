import React, { useLayoutEffect, useRef } from 'react';
import TransitionLink from '../components/TransitionLink';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Firm() {
    const mainRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animating the statistics count up
            const stats = gsap.utils.toArray('.stat-num');
            stats.forEach(stat => {
                const target = parseFloat(stat.getAttribute('data-target'));
                const prefix = stat.getAttribute('data-prefix') || '';
                const suffix = stat.getAttribute('data-suffix') || '';

                // If it's an integer, don't show decimals
                const isInt = target % 1 === 0;

                gsap.to(stat, {
                    innerHTML: target,
                    duration: 2.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 85%"
                    },
                    snap: { innerHTML: isInt ? 1 : 0.1 },
                    onUpdate: function () {
                        const val = Number(this.targets()[0].innerHTML);
                        stat.innerHTML = prefix + (isInt ? Math.round(val) : val.toFixed(1)) + suffix;
                    }
                });
            });

            // Parallax image
            gsap.to('.firm-parallax', {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: '.firm-parallax-container',
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <div id="firm" ref={mainRef} className="w-full bg-background text-dark pt-32 pb-32 selection:bg-accent selection:text-background overflow-hidden relative">

            <svg className="absolute top-0 right-0 w-full h-[150vh] opacity-[0.03] pointer-events-none z-0" viewBox="0 0 1000 1000" preserveAspectRatio="none" fill="none" stroke="currentColor">
                <path d="M 0 200 L 1000 200" strokeWidth="2" />
                <path d="M 0 400 L 1000 400" strokeWidth="2" />
                <path d="M 0 600 L 1000 600" strokeWidth="2" />
                <path d="M 0 800 L 1000 800" strokeWidth="2" />
                <path d="M 200 0 L 200 1000" strokeWidth="2" />
                <path d="M 500 0 L 500 1000" strokeWidth="2" />
                <path d="M 800 0 L 800 1000" strokeWidth="2" />
                <circle cx="500" cy="500" r="300" strokeWidth="1" strokeDasharray="10 10" />
            </svg>

            {/* Header */}
            <header className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-24 md:mb-40 pt-12 relative z-10">
                <p className="font-mono text-primary tracking-widest text-xs md:text-sm mb-8 uppercase">[ The Firm ]</p>
                <h1 className="font-sans font-bold text-5xl md:text-7xl lg:text-9xl tracking-tighter leading-none max-w-5xl mb-12">
                    We do not buy assets. <br />
                    <span className="font-drama italic text-dark/70 font-light">We engineer them.</span>
                </h1>
            </header>

            {/* AUM Stats */}
            <section className="w-full border-y border-dark/10 py-16 md:py-32 mb-24 md:mb-40 relative z-10 bg-background/80 backdrop-blur-sm">
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-dark/10">
                    <div className="flex flex-col md:pr-12 md:items-center text-center">
                        <span className="font-mono text-dark/50 text-xs md:text-sm uppercase tracking-widest mb-6 block">Assets Under Management</span>
                        <div className="font-sans font-bold text-7xl md:text-8xl tracking-tighter text-primary">
                            <span className="stat-num" data-prefix="$" data-target="4.2" data-suffix="B">0.0</span>
                        </div>
                    </div>
                    <div className="flex flex-col pt-12 md:pt-0 md:px-12 items-center text-center">
                        <span className="font-mono text-dark/50 text-xs md:text-sm uppercase tracking-widest mb-6 block">Active Developments</span>
                        <div className="font-sans font-bold text-7xl md:text-8xl tracking-tighter">
                            <span className="stat-num" data-target="12">0</span>
                        </div>
                    </div>
                    <div className="flex flex-col pt-12 md:pt-0 md:pl-12 items-center text-center">
                        <span className="font-mono text-dark/50 text-xs md:text-sm uppercase tracking-widest mb-6 block">Global Regions</span>
                        <div className="font-sans font-bold text-7xl md:text-8xl tracking-tighter">
                            <span className="stat-num" data-target="3">0</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Parallax Interstitial */}
            <section className="firm-parallax-container w-full h-[60vh] md:h-[80vh] overflow-hidden relative rounded-[2rem] mx-auto max-w-[95%] mb-24 md:mb-40 shadow-2xl z-10">
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2600" alt="Company Structure" className="firm-parallax absolute top-[-20%] left-0 w-full h-[140%] object-cover contrast-125 saturate-50 opacity-90 mix-blend-multiply" />
                <div className="absolute inset-0 bg-dark/20 mix-blend-multiply border border-dark/10 rounded-[2rem]"></div>
            </section>

            {/* Methodology */}
            <section className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-32 relative z-10">
                <div className="w-full flex flex-col md:flex-row gap-16 md:gap-24">
                    <div className="w-full md:w-1/3">
                        <h2 className="font-sans font-bold text-4xl md:text-6xl tracking-tighter leading-none mb-6">The <br />Methodology.</h2>
                        <p className="font-sans text-dark/70 text-lg leading-relaxed mb-8">Comfort Building utilizes a quantitative approach to structural acquisition, merging biometric urban analysis with aggressive capital deployment.</p>
                        <TransitionLink to="/portfolio" className="magnetic-btn inline-flex bg-dark text-background px-8 py-3 rounded-full text-sm font-medium group">
                            <span className="magnetic-btn-bg bg-primary"></span>
                            <span className="relative z-10 flex items-center gap-2">
                                View Master Portfolio
                            </span>
                        </TransitionLink>
                    </div>

                    <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-16">
                        {[
                            { title: 'Data-Backed Acquisition', desc: 'Every quadrant is analyzed against 400 unique urban datasets before capital is ever committed.' },
                            { title: 'Biometric Integration', desc: 'Our properties feature living, breathing HVAC and sensory grids tied directly to tenant biorhythms.' },
                            { title: 'Ruthless Efficiency', desc: 'Zero-carbon footprint is not a charity. It is the only way to mathematically guarantee long-term operational margins.' },
                            { title: 'Institutional Discretion', desc: 'Operating primarily off-market, dealing exclusively with vetted capital partners and sovereign wealth networks.' }
                        ].map((m, i) => (
                            <div key={i} className="flex flex-col border-t border-dark/20 pt-6">
                                <span className="font-mono text-primary text-sm mb-4">[{String(i + 1).padStart(2, '0')}]</span>
                                <h3 className="font-sans font-bold text-2xl mb-4">{m.title}</h3>
                                <p className="font-sans text-dark/70 text-base leading-relaxed">{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
