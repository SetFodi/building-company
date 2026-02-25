import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Utility for smooth word-by-word staggered reveals
const FadeInWords = ({ text, className, delay = 0 }) => {
    return (
        <span className={`${className} inline-flex flex-wrap gap-x-[0.3em]`}>
            {text.split(' ').map((word, i) => (
                <span key={i} className="inline-block overflow-hidden pb-3 -mb-3">
                    <span
                        className="hero-word inline-block translate-y-[120%] opacity-0 leading-[1.1]"
                        data-delay={delay}
                    >
                        {word}
                    </span>
                </span>
            ))}
        </span>
    );
};

export default function Hero() {
    const compRef = useRef(null);
    const imgRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Staggered Text Reveal
            gsap.to('.hero-word', {
                y: '0%',
                opacity: 1,
                duration: 1.4,
                ease: 'power3.out',
                stagger: 0.08,
                delay: 0.2
            });

            // 2. Fade in auxiliary elements (line, paragraph, button)
            gsap.fromTo('.hero-fade',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out', stagger: 0.2, delay: 0.8 }
            );

            // 3. Image Container Mask Reveal
            gsap.fromTo('.hero-image-container',
                { clipPath: 'inset(100% 0 0 0 round 2rem)' },
                { clipPath: 'inset(0% 0 0 0 round 2rem)', duration: 1.8, ease: 'power3.inOut', delay: 0.4 }
            );

            // 4. Subtle Parallax inside the Image Container
            gsap.to(imgRef.current, {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: compRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // 5. Magnetic CTA Button Logic
            const btn = document.querySelector('.hero-magnetic');
            if (btn) {
                const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power2" });
                const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power2" });

                btn.addEventListener("mousemove", (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
                    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
                    xTo(x);
                    yTo(y);
                });

                btn.addEventListener("mouseleave", () => {
                    xTo(0);
                    yTo(0);
                });
            }

        }, compRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={compRef} className="relative w-full min-h-[100dvh] bg-dark pt-32 pb-20 px-6 lg:px-12 flex flex-col justify-center overflow-hidden">

            {/* Global Noise Texture */}
            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none opacity-50 z-0"></div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full flex-grow">

                {/* Left Column: Massive Editorial Typography */}
                <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-8">

                    {/* Micro-Header (Fixing collision by placing it cleanly in the grid) */}
                    <div className="hero-fade flex items-center gap-4 mb-8">
                        <div className="w-12 h-[1px] bg-accent"></div>
                        <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">Private Syndicate</span>
                    </div>

                    <h1 className="flex flex-col m-0 w-full">
                        <FadeInWords
                            text="Curating the"
                            className="font-sans font-medium text-[11vw] leading-[0.9] lg:text-[6.5rem] tracking-tight text-background/90"
                        />
                        <FadeInWords
                            text="Architecture"
                            className="font-sans font-bold text-[13vw] leading-[0.9] lg:text-[7.5rem] tracking-tighter text-background"
                            delay={0.2}
                        />
                        <FadeInWords
                            text="of Tomorrow."
                            className="font-drama italic font-light text-[15vw] leading-[0.9] lg:text-[8.5rem] tracking-tight text-accent mt-2 ml-0 lg:ml-8"
                            delay={0.4}
                        />
                    </h1>

                    <div className="mt-12 lg:mt-24 max-w-md">
                        <p className="hero-fade font-sans text-background/70 text-lg leading-relaxed">
                            A boutique development firm securing prime real estate across the globe for stable, enduring yields.
                        </p>
                    </div>
                </div>

                {/* Right Column: Physical Grounding Aperture */}
                <div className="lg:col-span-5 w-full h-[60vh] lg:h-[80vh] relative pt-12 lg:pt-0">
                    <div className="hero-image-container w-full h-full rounded-[2rem] overflow-hidden relative shadow-2xl bg-dark/50">
                        <img
                            ref={imgRef}
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2600&auto=format&fit=crop"
                            alt="Luxury Real Estate Facade"
                            className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover scale-105"
                        />
                        {/* Elegant interior gradients for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                    </div>

                    {/* Magnetic Button bridging the two columns */}
                    <button className="hero-fade hero-magnetic absolute bottom-8 left-8 lg:-left-12 flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border border-dark/20 bg-accent text-dark shadow-xl hover:scale-105 transition-transform duration-500 z-20 group">
                        <span className="font-sans text-xs md:text-sm tracking-widest uppercase font-bold">Explore</span>
                        {/* Subtle inner ring effect */}
                        <span className="absolute inset-2 border border-dark/10 rounded-full scale-90 group-hover:scale-100 transition-transform duration-500"></span>
                    </button>
                </div>

            </div>
        </section>
    );
}
