import React from 'react';
import TransitionLink from './TransitionLink';

export default function Footer() {

    return (
        <footer className="bg-dark text-background pt-24 pb-12 px-6 rounded-t-[4rem] relative z-20 mt-[-2rem]">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-background/10 pb-16">

                {/* Brand & Tagline */}
                <div className="md:col-span-5 flex flex-col justify-between">
                    <div>
                        <h2 className="font-sans font-bold text-3xl tracking-tight mb-4 text-background">Comfort Building</h2>
                        <p className="font-mono text-sm text-background/60 max-w-sm leading-relaxed">
                            Structuring the future of modern architecture through organic precision and biophilic design patterns.
                        </p>
                    </div>

                    <div className="mt-12 flex items-center gap-3 bg-background/5 inline-flex w-max px-4 py-2 rounded-full border border-background/10">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="font-mono text-xs uppercase tracking-widest text-background/80">System Operational</span>
                    </div>
                </div>

                {/* Navigation Blocks */}
                <div className="md:col-span-2 md:col-start-8">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-background/40 mb-6">Framework</h4>
                    <ul className="space-y-4 font-sans text-sm text-background/80">
                        <li><TransitionLink to="/" className="hover:text-accent transition-colors">Philosophy</TransitionLink></li>
                        <li><TransitionLink to="/" className="hover:text-accent transition-colors">Protocol</TransitionLink></li>
                        <li><TransitionLink to="/portfolio" className="hover:text-accent transition-colors">Archive</TransitionLink></li>
                        <li><TransitionLink to="/firm" className="hover:text-accent transition-colors">The Firm</TransitionLink></li>
                    </ul>
                </div>

                <div className="md:col-span-2">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-background/40 mb-6">Entity</h4>
                    <ul className="space-y-4 font-sans text-sm text-background/80">
                        <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Press Area</a></li>
                    </ul>
                </div>
            </div>

            {/* Legal & Copyright */}
            <div className="max-w-6xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-background/40">
                <p>&copy; {new Date().getFullYear()} Comfort Building Inc. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-background transition-colors">Cookies</a>
                </div>
            </div>
        </footer>
    );
}
