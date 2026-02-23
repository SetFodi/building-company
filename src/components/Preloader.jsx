import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef(null);
    const counterRef = useRef(null);
    const barRef = useRef(null);

    useEffect(() => {
        // Lock scrolling during preloader
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = '';
                    if (onComplete) onComplete();
                }
            });

            // Simulate asset loading parsing over 1.8 seconds
            tl.to({ val: 0 }, {
                val: 100,
                duration: 1.8,
                ease: "power2.inOut",
                onUpdate: function () {
                    setProgress(Math.round(this.targets()[0].val));
                }
            }, 0)
                // Animate progress bar width
                .to(barRef.current, {
                    scaleX: 1,
                    duration: 1.8,
                    ease: "power2.inOut"
                }, 0)
                // Slight pause at 100% for impact
                .to({}, { duration: 0.2 })
                // Wipe the preloader up
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

            <div className="w-full max-w-sm flex flex-col items-center relative z-10">
                <div className="flex justify-between w-full items-end mb-4">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-background/50">
                        Initiating Architecture
                    </span>
                    <span className="font-mono font-bold text-3xl text-background">
                        {progress.toString().padStart(3, '0')}%
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-[1px] bg-background/20 relative overflow-hidden">
                    <div ref={barRef} className="absolute top-0 left-0 h-full w-full bg-accent origin-left scale-x-0"></div>
                </div>

                <div className="flex justify-between w-full mt-4">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-accent animate-pulse">
                        System Operational
                    </span>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-background/30">
                        AES-256
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
