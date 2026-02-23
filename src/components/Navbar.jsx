import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Toggle solid state when scrolling past 100px
            ScrollTrigger.create({
                start: 'top -100',
                end: 99999,
                toggleClass: {
                    targets: navRef.current,
                    className: 'scrolled'
                }
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center mt-6 px-4 pointer-events-none">
            <nav
                ref={navRef}
                className="pointer-events-auto flex items-center justify-between w-full max-w-5xl px-6 py-4 rounded-full transition-all duration-500 bg-transparent text-background border border-transparent [&.scrolled]:bg-background/80 [&.scrolled]:backdrop-blur-xl [&.scrolled]:text-primary [&.scrolled]:border-dark/10 [&.scrolled]:shadow-sm"
            >
                <div className="font-sans font-bold tracking-tight text-xl">
                    Comfort Building
                </div>

                <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <a href="#philosophy" className="hover-lift">Philosophy</a>
                    <a href="#protocol" className="hover-lift">Protocol</a>
                    <a href="#features" className="hover-lift">Features</a>
                </div>

                <button className="magnetic-btn bg-accent text-background px-6 py-2.5 text-sm font-medium group">
                    <span className="magnetic-btn-bg"></span>
                    <span className="relative z-10 flex items-center gap-2">
                        View Portfolio
                    </span>
                </button>
            </nav>
        </div>
    );
}
