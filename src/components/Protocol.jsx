import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const protocols = [
    {
        step: '01',
        title: 'Site Acquisition',
        desc: 'Strategic identification and procurement of high-yield locations with uncompromising potential.',
        anim: (
            <svg className="w-full h-full animate-[spin_30s_linear_infinite]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                <circle cx="50" cy="50" r="45" strokeDasharray="4 4" className="text-dark/20" />
                <circle cx="50" cy="50" r="35" className="text-dark/40" />
                <circle cx="50" cy="50" r="10" className="text-primary" />
                <path d="M50 0 L50 15 M50 85 L50 100 M0 50 L15 50 M85 50 L100 50" strokeWidth="1" className="text-dark" />
                <path d="M50 20 L60 50 L50 80 L40 50 Z" className="text-accent fill-accent/10" strokeWidth="0.5" />
            </svg>
        )
    },
    {
        step: '02',
        title: 'Structural Planning',
        desc: 'Precision engineering and construction overseen by master architects to ensure lasting legacy.',
        anim: (
            <div className="relative w-full h-full border border-dark/10 bg-dark/5 overflow-hidden flex items-end p-8 gap-3">
                <div className="w-1/4 bg-dark/30 origin-bottom" style={{ height: '40%', animation: 'pulseHeight 4s ease-in-out infinite alternate' }}></div>
                <div className="w-1/4 bg-dark/50 origin-bottom" style={{ height: '60%', animation: 'pulseHeight 4s ease-in-out infinite alternate-reverse' }}></div>
                <div className="w-1/4 bg-primary origin-bottom" style={{ height: '85%', animation: 'pulseHeight 3s ease-in-out infinite alternate' }}></div>
                <div className="w-1/4 bg-accent/80 origin-bottom" style={{ height: '50%', animation: 'pulseHeight 5s ease-in-out infinite alternate-reverse' }}></div>

                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 95%, rgba(0,0,0,0.05) 95%)', backgroundSize: '100% 20px' }}></div>
                <style>{`
          @keyframes pulseHeight {
            0% { transform: scaleY(0.9); opacity: 0.8; }
            100% { transform: scaleY(1.05); opacity: 1; }
          }
         `}</style>
            </div>
        )
    },
    {
        step: '03',
        title: 'Asset Management',
        desc: 'Long-term portfolio maturation and optimization, driving steady property appreciation.',
        anim: (
            <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Subtle grid background */}
                <path d="M 0 25 L 200 25 M 0 50 L 200 50 M 0 75 L 200 75" className="text-dark/5" strokeWidth="0.5" />
                <path
                    d="M 10 90 Q 40 90, 60 70 T 110 50 T 160 30 T 190 10"
                    className="text-primary"
                    strokeDasharray="400"
                    strokeDashoffset="400"
                    style={{ animation: 'drawChart 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
                />
                <style>{`
          @keyframes drawChart { 
            0% { stroke-dashoffset: 400; } 
            70%, 100% { stroke-dashoffset: 0; } 
          }
        `}</style>
            </svg>
        )
    }
];

export default function Protocol() {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.protocol-inner');

            // Apply a simple interior entrance animation when the card stacks into view
            cards.forEach((card) => {
                gsap.fromTo(card,
                    { y: 50, opacity: 0, scale: 0.95 },
                    {
                        y: 0, opacity: 1, scale: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 80%", // triggers right as the card slides up
                        }
                    }
                );
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="protocol" className="w-full bg-background relative">
            {protocols.map((protocol, i) => (
                <div
                    key={i}
                    className="sticky top-0 w-full h-[100dvh] flex items-center justify-center p-6 sm:p-12 md:p-24 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] overflow-hidden bg-background"
                    style={{ zIndex: i + 1 }}
                >
                    <div className="protocol-inner w-full max-w-[1400px] h-full max-h-[80vh] bg-background flex flex-col md:flex-row overflow-hidden rounded-[2rem] border border-dark/10 shadow-2xl relative">

                        <div className="w-full md:w-1/2 p-10 md:p-24 flex flex-col justify-center border-r border-dark/5 relative z-10">
                            <span className="font-mono text-accent text-lg mb-4 md:mb-8 tracking-widest block">[{protocol.step}]</span>
                            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-dark tracking-tight mb-4 md:mb-6 text-balance">
                                {protocol.title}
                            </h2>
                            <p className="font-sans text-dark/70 text-base md:text-xl max-w-md leading-relaxed">
                                {protocol.desc}
                            </p>
                        </div>

                        <div className="w-full md:w-1/2 bg-background/50 flex items-center justify-center p-10 md:p-24 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                            <div className="w-full aspect-square max-w-[250px] md:max-w-[400px] relative z-10 p-8 md:p-12 bg-background rounded-[2rem] border border-dark/5 shadow-lg">
                                {protocol.anim}
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </section>
    );
}
