import React from 'react';

export default function Membership() {
    return (
        <section className="bg-background py-32 px-6 relative z-10 w-full">
            <div className="max-w-4xl mx-auto organic-card p-12 md:p-24 text-center overflow-hidden relative">
                <div className="absolute inset-0 bg-dark/5 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>

                <div className="relative z-10 flex flex-col items-center">
                    <span className="font-mono text-accent text-sm tracking-widest uppercase mb-6">Phase 01</span>

                    <h2 className="font-serif italic text-5xl md:text-7xl lg:text-8xl text-dark leading-none mb-8 font-light tracking-tight pb-2">
                        Initiate Contact.
                    </h2>

                    <p className="font-sans text-dark/70 text-lg md:text-xl max-w-xl mx-auto mb-12">
                        Begin the development of prime real estate assets and structural longevity. Engage our portfolio managers today.
                    </p>

                    <button className="magnetic-btn bg-primary text-background px-10 py-5 text-sm font-semibold uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/20 scale-110">
                        <span className="magnetic-btn-bg"></span>
                        <span className="relative z-10">Start The Process</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
