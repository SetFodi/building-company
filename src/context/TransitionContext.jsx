import React, { createContext, useContext, useRef, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import TwinTowers from '../components/TwinTowers';

const TransitionContext = createContext();

export const useTransitionNavigate = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        // Initialize off-screen top so it doesn't block clicks
        gsap.set(containerRef.current, { yPercent: -100 });
    }, []);

    const transitionNavigate = (to) => {
        if (location.pathname === to) return;

        document.body.style.overflow = 'hidden';

        const tl = gsap.timeline({
            onComplete: () => {
                navigate(to);
                window.scrollTo(0, 0);

                // Animate OUT (wipe up to top to reveal new page)
                gsap.to(containerRef.current, {
                    yPercent: -100,
                    duration: 1.0,
                    ease: "power4.inOut",
                    delay: 0.3,
                    onComplete: () => {
                        document.body.style.overflow = '';
                    }
                });
            }
        });

        // Reset building blocks to invisible/top
        gsap.set('.t-block', { y: -60, opacity: 0 });
        gsap.set('.t-text', { opacity: 0 });

        // Animate IN (wipe up from bottom to cover screen)
        tl.fromTo(containerRef.current,
            { yPercent: 100 },
            {
                yPercent: 0,
                duration: 1.0,
                ease: "power4.inOut"
            }
        )
            // Construction Animation Sequence
            .to('.t-text', {
                opacity: 1,
                duration: 0.3
            }, "-=0.2") // start text fade slightly before container finish
            .to('.t-block', {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.5)" // subtle heavy bounce impact
            }, "-=0.2");
    };

    return (
        <TransitionContext.Provider value={transitionNavigate}>
            {children}

            {/* The Transition Overlay */}
            <div
                ref={containerRef}
                className="fixed inset-0 z-[99999] bg-dark flex flex-col items-center justify-center text-background px-6 pointer-events-none"
            >
                <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none mix-blend-overlay"></div>

                <div className="w-full max-w-sm flex flex-col items-center relative z-10 gap-8">

                    {/* Building Assembly SVG/DOM */}
                    <TwinTowers blockClass="t-block" />

                    <div className="flex flex-col items-center gap-2 t-text">
                        <span className="font-mono text-xs tracking-[0.3em] uppercase text-background/50 text-center">
                            Constructing Environment
                        </span>
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                            <span className="font-mono text-[10px] tracking-widest uppercase text-accent">
                                Structural Sync
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </TransitionContext.Provider>
    );
};
