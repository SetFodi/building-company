import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TwinTowers from './TwinTowers';

const Preloader = ({ onComplete }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Lock scrolling during preloader
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            const blocks = containerRef.current.querySelectorAll('.p-block');
            gsap.set(blocks, { y: -60, opacity: 0 });
            gsap.set('.p-text', { opacity: 0 });

            const tl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = '';
                    if (onComplete) onComplete();
                }
            });

            tl.to({}, { duration: 0.5 }) // Initial delay for safety
                .to('.p-text', {
                    opacity: 1,
                    duration: 0.4
                })
                .to(blocks, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.5)"
                }, "-=0.2")
                .to({}, { duration: 0.6 }) // Wait for users to see the towers
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: "power4.inOut"
                });
        }, containerRef);

        return () => {
            document.body.style.overflow = '';
            ctx.revert();
        };
    }, [onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center text-background px-6">
            <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none mix-blend-overlay"></div>

            <div className="w-full max-w-sm flex flex-col items-center relative z-10 gap-8">
                <TwinTowers blockClass="p-block" />

                <div className="flex flex-col items-center gap-2 p-text">
                    <span className="font-mono text-xs tracking-[0.3em] uppercase text-background/50 text-center">
                        Initializing Framework
                    </span>
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                        <span className="font-mono text-[10px] tracking-widest uppercase text-accent">
                            System Boot
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
