import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

// Encapsulated Live Clock Component
const LiveClock = ({ timeZone }) => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            setTime(formatter.format(now));
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, [timeZone]);

    return <span className="font-mono text-primary text-sm tracking-widest">{time}</span>;
};

export default function Inquiries() {
    const mainRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate lines when inputs are focused
            const inputs = gsap.utils.toArray('.madlibs-input');
            inputs.forEach(input => {
                const line = input.nextElementSibling; // the underline div
                input.addEventListener('focus', () => {
                    gsap.to(line, { scaleX: 1, duration: 0.4, ease: "power3.out" });
                });
                input.addEventListener('blur', () => {
                    gsap.to(line, { scaleX: 0, duration: 0.4, ease: "power3.in" });
                });
            });

            // Fade up form elements sequentially
            gsap.fromTo('.form-element', {
                y: 30, opacity: 0
            }, {
                y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2
            });

        }, mainRef);
        return () => ctx.revert();
    }, []);

    const cities = [
        { name: 'New York', tz: 'America/New_York' },
        { name: 'London', tz: 'Europe/London' },
        { name: 'Dubai', tz: 'Asia/Dubai' },
        { name: 'Tbilisi', tz: 'Asia/Tbilisi' }
    ];

    return (
        <div id="inquiries" ref={mainRef} className="w-full min-h-screen flex flex-col md:flex-row bg-background">

            {/* Left Column (Dark) */}
            <div className="w-full md:w-[45%] lg:w-[40%] min-h-[50vh] md:min-h-screen bg-dark text-background p-6 md:p-12 lg:p-24 flex flex-col justify-between relative overflow-hidden left-split-pin">
                <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none mix-blend-overlay"></div>

                <div className="relative z-10 pt-24 md:pt-32">
                    <p className="font-mono text-primary tracking-widest text-xs uppercase mb-16 md:mb-24">[ Global Network ]</p>

                    <div className="flex flex-col gap-8 mb-24 md:mb-32">
                        {cities.map(city => (
                            <div key={city.name} className="flex items-center justify-between border-b border-background/10 pb-4 hover:border-background/30 transition-colors">
                                <span className="font-sans font-bold text-2xl md:text-3xl tracking-tight">{city.name}</span>
                                <LiveClock timeZone={city.tz} />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-8">
                        <div>
                            <span className="font-mono text-background/50 text-xs tracking-widest uppercase block mb-2">Acquisitions & Development</span>
                            <a href="mailto:acquisitions@comfort.build" className="font-sans text-lg hover:text-primary transition-colors">acquisitions@comfort.build</a>
                        </div>
                        <div>
                            <span className="font-mono text-background/50 text-xs tracking-widest uppercase block mb-2">Investor Relations</span>
                            <a href="mailto:ir@comfort.build" className="font-sans text-lg hover:text-primary transition-colors">ir@comfort.build</a>
                        </div>
                        <div>
                            <span className="font-mono text-background/50 text-xs tracking-widest uppercase block mb-2">Media & Press</span>
                            <a href="mailto:press@comfort.build" className="font-sans text-lg hover:text-primary transition-colors">press@comfort.build</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column (Light) */}
            <div className="w-full md:w-[55%] lg:w-[60%] min-h-[50vh] md:min-h-screen bg-background text-dark p-6 md:p-12 lg:p-24 flex flex-col justify-center relative shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-10">
                <div className="max-w-2xl mx-auto w-full pt-16 md:pt-0">
                    <h1 className="form-element font-sans font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none mb-20">
                        Initiate a<br />
                        <span className="font-drama italic text-dark/70 font-light">dialogue.</span>
                    </h1>

                    <form className="font-sans text-2xl md:text-3xl lg:text-4xl leading-relaxed md:leading-[2.2]" onSubmit={(e) => e.preventDefault()}>
                        <span className="form-element">I represent </span>

                        <div className="form-element inline-block relative mx-2 align-baseline">
                            <input
                                type="text"
                                placeholder="[ Company Name ]"
                                className="madlibs-input min-w-[280px] md:min-w-[360px] lg:min-w-[420px] bg-transparent border-b border-dark/20 px-2 py-1 text-primary focus:outline-none placeholder:text-dark/30 placeholder:font-normal font-bold"
                            />
                            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary origin-left scale-x-0"></div>
                        </div>

                        <span className="form-element">, and I am looking to direct a conversation regarding </span>

                        <div className="form-element inline-block relative mx-2 align-baseline">
                            <select className="madlibs-input appearance-none w-64 md:w-[320px] lg:w-[380px] bg-transparent border-b border-dark/20 px-2 py-1 text-primary focus:outline-none cursor-pointer font-bold select-auto" defaultValue="">
                                <option value="" disabled>[ Select Protocol ]</option>
                                <option value="asset">Asset Management</option>
                                <option value="site">Site Acquisition</option>
                                <option value="structural">Structural Planning</option>
                            </select>
                            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary origin-left scale-x-0"></div>
                        </div>

                        <span className="form-element">. You can reach me securely at </span>

                        <div className="form-element inline-block relative mx-2 align-baseline">
                            <input
                                type="email"
                                placeholder="[ Email Address ]"
                                className="madlibs-input min-w-[280px] md:min-w-[360px] bg-transparent border-b border-dark/20 px-2 py-1 text-primary focus:outline-none placeholder:text-dark/30 placeholder:font-normal font-bold"
                            />
                            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary origin-left scale-x-0"></div>
                        </div>
                        <span className="form-element">.</span>

                        <div className="form-element mt-24">
                            <button type="submit" className="magnetic-btn bg-dark text-background px-12 py-5 rounded-full text-base font-medium group">
                                <span className="magnetic-btn-bg bg-primary"></span>
                                <span className="relative z-10 flex items-center gap-2 tracking-wide uppercase font-mono text-sm">
                                    Transmit Protocol
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}
