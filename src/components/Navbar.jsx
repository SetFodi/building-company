import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TransitionLink from './TransitionLink';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef(null);
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
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

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const path = location.pathname;
    let logoColor = 'text-background';
    let linksColor = 'text-background';

    if (path === '/firm' || path.startsWith('/portfolio')) {
        logoColor = 'text-dark';
        linksColor = 'text-dark';
    } else if (path === '/inquiries') {
        logoColor = 'text-background';
        linksColor = 'text-dark';
    }

    return (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center mt-6 px-4 pointer-events-none">
            <nav
                ref={navRef}
                className="group pointer-events-auto flex items-center justify-between w-full max-w-5xl px-6 py-4 rounded-full transition-all duration-500 bg-transparent border border-transparent [&.scrolled]:bg-background/80 [&.scrolled]:backdrop-blur-xl [&.scrolled]:border-dark/10 [&.scrolled]:shadow-sm relative z-[60]"
            >
                <div className={`font-sans font-bold tracking-tight text-2xl group-[.scrolled]:text-dark transition-colors duration-500 ${isMenuOpen ? 'text-primary' : logoColor}`}>
                    <TransitionLink to="/">Comfort Building</TransitionLink>
                </div>

                <div className={`hidden md:flex items-center space-x-8 text-base font-medium group-[.scrolled]:text-dark transition-colors duration-500 ${linksColor}`}>
                    <TransitionLink to="/" className="hover-lift">Home</TransitionLink>
                    <TransitionLink to="/firm" className="hover-lift">The Firm</TransitionLink>
                    <TransitionLink to="/portfolio" className="hover-lift">Archive</TransitionLink>
                    <TransitionLink to="/inquiries" className="hover-lift">Inquiries</TransitionLink>
                </div>

                <div className="flex items-center gap-4">
                    <TransitionLink to="/portfolio" className="magnetic-btn hidden sm:inline-flex bg-accent text-background px-6 py-2.5 text-sm font-medium group">
                        <span className="magnetic-btn-bg"></span>
                        <span className="relative z-10 flex items-center gap-2">
                            View Portfolio
                        </span>
                    </TransitionLink>

                    {/* Mobile Hamburger Toggle */}
                    <button
                        className={`md:hidden p-2 transition-colors duration-300 ${isMenuOpen ? 'text-primary' : linksColor} group-[.scrolled]:text-dark`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Fullscreen Overlay */}
            <div
                className={`fixed inset-0 bg-dark/95 backdrop-blur-xl z-[55] flex flex-col justify-center items-center pointer-events-auto transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
                <div className="flex flex-col items-center space-y-10 text-3xl font-sans font-bold text-background">
                    <TransitionLink to="/" className="hover:text-primary transition-colors">Home</TransitionLink>
                    <TransitionLink to="/firm" className="hover:text-primary transition-colors">The Firm</TransitionLink>
                    <TransitionLink to="/portfolio" className="hover:text-primary transition-colors">Archive</TransitionLink>
                    <TransitionLink to="/inquiries" className="hover:text-primary transition-colors">Inquiries</TransitionLink>
                </div>
            </div>
        </div>
    );
}
