import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const FeatureCard = ({ title, desc, image, delay }) => {
    const cardRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(cardRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: "top 85%",
                    }
                }
            );

            // Subtle image scale on hover
            const img = cardRef.current.querySelector('.feature-img');
            cardRef.current.addEventListener('mouseenter', () => gsap.to(img, { scale: 1.05, duration: 1.5, ease: "power2.out" }));
            cardRef.current.addEventListener('mouseleave', () => gsap.to(img, { scale: 1, duration: 1.5, ease: "power2.out" }));

        }, cardRef);

        return () => ctx.revert();
    }, [delay]);

    return (
        <div ref={cardRef} className="organic-card overflow-hidden group border-dark/5 flex flex-col h-[420px] cursor-pointer">
            <div className="h-2/3 w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-dark/20 z-10 mix-blend-multiply group-hover:bg-transparent transition-colors duration-700"></div>
                <img
                    src={image}
                    alt={title}
                    className="feature-img w-full h-full object-cover origin-center"
                />
            </div>
            <div className="flex-1 p-6 lg:p-8 bg-background flex flex-col justify-center relative z-20">
                <h3 className="font-drama italic text-3xl text-primary mb-2 leading-none">{title}</h3>
                <p className="font-sans text-sm text-dark/60 tracking-wide leading-relaxed">{desc}</p>
            </div>
        </div>
    );
};

export default function Features() {
    return (
        <section id="features" className="py-24 md:py-32 bg-background relative z-20 w-full rounded-t-[3rem] -mt-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <h2 className="font-drama italic text-5xl md:text-6xl text-primary leading-none">
                        Our <br />Holdings.
                    </h2>
                    <p className="font-sans tracking-wide text-sm max-w-sm text-dark/60 leading-relaxed">
                        A curated portfolio of architectural excellence, securing prime real estate across the globe for stable, enduring yields.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                        title="Commercial"
                        desc="High-yield corporate hubs designed to foster business growth and secure long-term tenant stability."
                        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2600&auto=format&fit=crop"
                        delay={0}
                    />
                    <FeatureCard
                        title="Residential"
                        desc="Luxury living spaces prioritizing biophilic design, ensuring highly sought-after properties."
                        image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2600&auto=format&fit=crop"
                        delay={0.2}
                    />
                    <FeatureCard
                        title="Mixed-Use"
                        desc="Integrated urban developments serving as vibrant community cores while maximizing asset value."
                        image="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2600&auto=format&fit=crop"
                        delay={0.4}
                    />
                </div>
            </div>
        </section>
    );
}
