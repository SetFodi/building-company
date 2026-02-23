import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
    const compRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Fade up animation for hero content
            gsap.fromTo(
                '.hero-anim',
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: 'power3.out',
                    delay: 0.2
                }
            );
        }, compRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={compRef} className="relative w-full h-[100dvh] overflow-hidden flex items-end">
            {/* Background Image */}
            <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2600&auto=format&fit=crop"
                alt="Luxury real estate development"
                className="absolute inset-0 w-full h-full object-cover select-none"
            />

            {/* Gradient Overlays for text legibility */}
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-dark/90 via-dark/40 to-transparent pointer-events-none z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent mix-blend-multiply pointer-events-none z-0" />
            <div className="absolute inset-0 bg-primary/20 pointer-events-none mix-blend-overlay z-0" />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32 lg:w-2/3 ml-0 lg:ml-auto lg:mr-auto">
                <div className="flex flex-col items-start gap-4">
                    <h1 className="flex flex-col uppercase m-0 leading-[0.85]">
                        <span className="hero-anim text-background font-sans font-bold text-3xl md:text-5xl lg:text-6xl tracking-tighter">
                            Architecture is the
                        </span>
                        <span className="hero-anim text-background font-drama italic font-light text-6xl md:text-[8rem] lg:text-[10rem] tracking-tight -ml-2 text-primary mix-blend-plus-lighter" style={{ color: '#F2F0E9' }}>
                            Comfort.
                        </span>
                    </h1>

                    <p className="hero-anim text-background/80 font-sans text-lg md:text-xl max-w-md mt-6 tracking-wide mb-8">
                        Structuring the future of luxury real estate through precision architecture and timeless development.
                    </p>

                    <button className="hero-anim magnetic-btn bg-accent text-background px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:shadow-xl hover:shadow-accent/20">
                        <span className="magnetic-btn-bg"></span>
                        <span className="relative z-10">Discover Vision</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
