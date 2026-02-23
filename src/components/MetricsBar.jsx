import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MetricBlock = ({ endValue, label, prefix = '', suffix = '' }) => {
    const numRef = useRef(null);
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const el = numRef.current;
            const obj = { val: 0 };

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 95%",
                onEnter: () => {
                    gsap.to(obj, {
                        val: endValue,
                        duration: 2,
                        ease: "power2.out",
                        onUpdate: () => {
                            // Format with one decimal if it's a float, otherwise whole number
                            const isFloat = endValue % 1 !== 0;
                            const formatted = isFloat ? obj.val.toFixed(1) : Math.round(obj.val);
                            el.innerHTML = formatted;
                        }
                    });
                },
                once: true
            });
        }, containerRef);
        return () => ctx.revert();
    }, [endValue]);

    return (
        <div ref={containerRef} className="flex flex-col items-center md:items-start space-y-2 border-l border-background/10 pl-6 md:pl-10 first:border-l-0 first:pl-0">
            <div className="font-mono text-4xl md:text-5xl lg:text-6xl text-background font-light tracking-tighter">
                <span className="text-accent">{prefix}</span>
                <span ref={numRef}>0</span>
                <span>{suffix}</span>
            </div>
            <div className="font-sans text-xs md:text-sm tracking-widest uppercase text-background/50 font-medium">
                {label}
            </div>
        </div>
    );
};

export default function MetricsBar() {
    return (
        <section className="bg-dark w-full relative z-20 shadow-2xl overflow-hidden py-16 md:py-20 lg:py-24">

            {/* Subtle background texture grid */}
            <div className="absolute inset-0 border-[0.5px] border-background/5 [background-size:24px_24px] [background-image:linear-gradient(to_right,#F2F0E903_1px,transparent_1px),linear-gradient(to_bottom,#F2F0E903_1px,transparent_1px)] pointer-events-none opacity-20 relative z-0"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-6">

                <MetricBlock
                    endValue={2.4}
                    prefix="$"
                    suffix="B"
                    label="Assets Under Management"
                />

                <MetricBlock
                    endValue={15}
                    prefix=""
                    suffix="+"
                    label="Global Prime Markets"
                />

                <MetricBlock
                    endValue={4.2}
                    prefix=""
                    suffix="M"
                    label="Sq Ft Developed"
                />

                <MetricBlock
                    endValue={98}
                    prefix=""
                    suffix="%"
                    label="Average Occupancy"
                />

            </div>
        </section>
    );
}
