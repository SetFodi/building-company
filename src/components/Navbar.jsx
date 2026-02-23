import React, { useRef, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TransitionLink from './TransitionLink';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef(null);
    const location = useLocation();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Re-apply the solid state toggle when scrolling past 100px
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
    }, [location.pathname]);

    const path = location.pathname;
    let logoColor = 'text-background';
    let linksColor = 'text-background';

    if (path === '/firm' || path.startsWith('/portfolio')) {
        logoColor = 'text-dark';
        linksColor = 'text-dark';
    } else if (path === '/inquiries') {
        logoColor = 'text-background'; // White
        linksColor = 'text-dark';      // Black
    }

    return (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center mt-6 px-4 pointer-events-none">
            <nav
                ref={navRef}
                className="group pointer-events-auto flex items-center justify-between w-full max-w-5xl px-6 py-4 rounded-full transition-all duration-500 bg-transparent border border-transparent [&.scrolled]:bg-background/80 [&.scrolled]:backdrop-blur-xl [&.scrolled]:border-dark/10 [&.scrolled]:shadow-sm"
            >
                <div className={`font-sans font-bold tracking-tight text-2xl group-[.scrolled]:text-primary transition-colors duration-500 ${logoColor}`}>
                    <TransitionLink to="/">Comfort Building</TransitionLink>
                </div>

                <div className={`hidden md:flex items-center space-x-8 text-base font-medium group-[.scrolled]:text-primary transition-colors duration-500 ${linksColor}`}>
                    <TransitionLink to="/" className="hover-lift">Home</TransitionLink>
                    <TransitionLink to="/firm" className="hover-lift">The Firm</TransitionLink>
                    <TransitionLink to="/portfolio" className="hover-lift">Archive</TransitionLink>
                    <TransitionLink to="/inquiries" className="hover-lift">Inquiries</TransitionLink>
                </div>

                <TransitionLink to="/portfolio" className="magnetic-btn inline-flex bg-accent text-background px-6 py-2.5 text-sm font-medium group">
                    <span className="magnetic-btn-bg"></span>
                    <span className="relative z-10 flex items-center gap-2">
                        View Portfolio
                    </span>
                </TransitionLink>
            </nav>
        </div>
    );
}
