import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeatureCol = ({ title, data, desc, image, offset = false }) => {
    const colRef = useRef(null);
    const imgContainerRef = useRef(null);
    const imgRef = useRef(null);
    const textRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: colRef.current,
                    start: "top 80%",
                }
            });

            // 1. Cinematic Clip-Path Reveal for the Image Container
            tl.fromTo(imgContainerRef.current,
                { clipPath: 'inset(100% 0 0 0 round 2rem)' },
                { clipPath: 'inset(0% 0 0 0 round 2rem)', duration: 1.4, ease: "power3.inOut" }
            );

            // 2. Parallax Settle for the Image itself
            tl.fromTo(imgRef.current,
                { scale: 1.3 },
                { scale: 1, duration: 2, ease: "power2.out" },
                "<0.2" // Start slightly after the mask begins
            );

            // 3. Staggered Text Reveal
            tl.fromTo(textRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power2.out" },
                "-=1.2" // Overlap with the end of the image reveal
            );

        }, colRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={colRef}
            className={`feature-col flex flex-col group cursor-pointer ${offset ? 'md:mt-24' : ''}`}
        >
            {/* Editorial Image Container - Removed Dark Overlay */}
            <div ref={imgContainerRef} className="w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden relative mb-8 shadow-xl" style={{ borderRadius: '2rem' }}>
                <img
                    ref={imgRef}
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover origin-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.07]"
                />
            </div>

            {/* The B2B Tech & Editorial Text - Made Colorful By Default */}
            <div ref={textRef} className="flex flex-col items-start pr-4">
                <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-primary mb-3">
                    {data}
                </span>
                <h3 className="font-drama italic text-3xl md:text-4xl text-dark mb-4 leading-none">
                    {title}
                </h3>
                <p className="font-sans text-sm md:text-base text-dark/70 tracking-wide leading-relaxed">
                    {desc}
                </p>
            </div>
        </div>
    );
};

export default function Features() {
    return (
        <section id="features" className="py-24 md:py-40 bg-background relative z-20 w-full rounded-t-[3rem] -mt-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <h2 className="font-drama italic text-6xl md:text-7xl lg:text-8xl text-dark leading-[0.9] tracking-tight">
                        Our <br /><span className="text-primary">Holdings.</span>
                    </h2>
                    <p className="font-sans tracking-wide text-base md:text-lg max-w-sm text-dark/60 leading-relaxed mb-2">
                        A curated portfolio of architectural excellence, securing prime real estate across the globe for stable, enduring yields.
                    </p>
                </div>

                {/* The Editorial Cross-Hover Grid */}
                <div className="group/grid grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    <FeatureCol
                        title="Commercial"
                        data="[ VOL: $1.2B ] — [ ASSETS: 14 ]"
                        desc="High-yield corporate hubs designed to foster business growth and secure long-term tenant stability with massive global corporations."
                        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2600&auto=format&fit=crop"
                        offset={false}
                    />
                    <FeatureCol
                        title="Residential"
                        data="[ VOL: $850M ] — [ ASSETS: 22 ]"
                        desc="Luxury living spaces prioritizing biophilic design and precision engineering, ensuring highly sought-after, appreciating properties."
                        image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2600&auto=format&fit=crop"
                        offset={true}
                    />
                    <FeatureCol
                        title="Mixed-Use"
                        data="[ VOL: $350M ] — [ ASSETS: 4 ]"
                        desc="Integrated urban developments serving as vibrant community cores, blending retail, office, and living spaces to maximize asset yield."
                        image="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2600&auto=format&fit=crop"
                        offset={false}
                    />
                </div>

            </div>
        </section>
    );
}
