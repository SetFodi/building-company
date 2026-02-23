import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Helper to manually split text into words for animation
const SplitWords = ({ text, className }) => {
    return (
        <span className={className}>
            {text.split(' ').map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-4 -mb-4">
                    <span className="word-anim inline-block translate-y-[120%] opacity-0 leading-[1.2]">
                        {word}
                    </span>
                </span>
            ))}
        </span>
    );
};

export default function Philosophy() {
    const compRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Background
            gsap.to('.parallax-bg', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: compRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            });

            // Split words reveal
            gsap.to('.word-anim', {
                y: '0%',
                opacity: 1,
                duration: 1.2,
                stagger: 0.05,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.manifesto-text',
                    start: 'top 80%',
                }
            });
        }, compRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={compRef} id="philosophy" className="relative w-full min-h-[80vh] bg-dark flex items-center overflow-hidden py-32">
            {/* Background Image Parallax */}
            <img
                src="https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=2600&auto=format&fit=crop"
                alt="Marble architecture texture"
                className="parallax-bg absolute inset-0 w-full h-[120%] object-cover opacity-10 blur-sm pointer-events-none -top-[10%]"
            />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 manifesto-text">
                <p className="font-sans text-background/60 text-lg md:text-xl uppercase tracking-widest mb-12">
                    <SplitWords text="Most architecture focuses on: static isolation." />
                </p>

                <h2 className="font-drama text-5xl md:text-7xl lg:text-8xl text-background leading-[1.1]">
                    <SplitWords text="We focus on:" className="block italic text-primary font-light" />
                    <SplitWords text="enduring" className="block text-background font-normal" />
                    <span className="inline-block overflow-hidden pb-4 -mb-4">
                        <span className="word-anim inline-block translate-y-[120%] opacity-0 italic text-accent pr-4 font-bold leading-[1.2]">
                            legacy.
                        </span>
                    </span>
                </h2>
            </div>
        </section>
    );
}
