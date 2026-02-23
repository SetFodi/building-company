import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function TwinTowers({ blockClass = "b-block" }) {
    const craneJibRef = useRef(null);
    const cableRef = useRef(null);
    const tractorRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Elegant slow-motion construction machinery loops

            // Tractor: Pushes forward slowly, reverses
            gsap.to(tractorRef.current, {
                x: 40,
                duration: 3,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1
            });

            // Crane: Swings slowly, lowers cable, lifts
            const craneTl = gsap.timeline({ repeat: -1 });
            craneTl.to(craneJibRef.current, { rotation: 8, duration: 2.5, ease: "power1.inOut" })
                .to(cableRef.current, { height: 80, duration: 2, ease: "power2.inOut" }, "-=1")
                .to(cableRef.current, { height: 40, duration: 2, ease: "power2.inOut" })
                .to(craneJibRef.current, { rotation: 0, duration: 2.5, ease: "power1.inOut" }, "-=1");

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-[340px] h-[220px] flex items-end justify-center mb-4">

            {/* Ground Line */}
            <div className="absolute bottom-0 w-[400px] h-[3px] bg-primary z-10 rounded-full"></div>

            {/* ---> LEFT BUILDING (Slate & Gold) <--- */}
            <div className={`${blockClass} absolute bottom-[3px] left-[50px] w-[60px] h-[100px] bg-secondary border-[2px] border-primary z-20 flex flex-col justify-end p-2 gap-2`}>
                <div className="w-full h-8 bg-dark border-[2px] border-primary"></div>
                <div className="w-full h-8 bg-dark border-[2px] border-primary"></div>
            </div>

            {/* ---> MIDDLE BUILDING (Gold & Ivory) <--- */}
            <div className={`${blockClass} absolute bottom-[3px] left-[110px] w-[50px] h-[70px] bg-primary border-[2px] border-background z-10 flex flex-col items-center justify-end pb-3 gap-2`}>
                <div className="w-8 h-8 bg-background border-[2px] border-dark"></div>
            </div>

            {/* ---> RIGHT BUILDING (Ivory & Gold) <--- */}
            <div className={`${blockClass} absolute bottom-[3px] left-[160px] w-[60px] h-[50px] bg-background border-[2px] border-primary z-10 flex justify-center items-center gap-2 px-1`}>
                <div className="w-6 h-8 bg-primary border-[2px] border-dark"></div>
                <div className="w-6 h-8 bg-primary border-[2px] border-dark"></div>
            </div>

            {/* ---> THE CRANE (Ivory & Gold) <--- */}
            {/* Mast */}
            <div className="absolute bottom-[3px] right-[40px] w-[20px] h-[160px] bg-dark border-[2px] border-primary z-0 flex flex-col justify-evenly p-[2px]">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-[20px] h-[2px] bg-primary rotate-45 ml-[-4px]"></div>
                ))}
            </div>
            {/* Cabin */}
            <div className="absolute top-[30px] right-[48px] w-[20px] h-[16px] bg-primary border-[2px] border-background z-20"></div>

            {/* Jib Arm Container */}
            <div
                ref={craneJibRef}
                className="absolute top-[16px] right-[40px] w-[140px] h-[100px] z-10 origin-right pointer-events-none"
            >
                {/* The actual Jib Arm */}
                <div className="absolute top-0 right-0 w-[140px] h-[12px] bg-dark border-[2px] border-primary flex items-center justify-center overflow-hidden">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-[10px] h-[2px] bg-primary rotate-45" style={{ marginLeft: '4px' }}></div>
                    ))}
                </div>

                {/* Cable dropping from arm */}
                <div
                    ref={cableRef}
                    className="absolute top-[10px] left-[20px] w-[2px] h-[40px] bg-primary z-10 flex flex-col items-center justify-end origin-top"
                >
                    {/* Hooked Prefab Module */}
                    <div className={`${blockClass} absolute bottom-[-30px] left-[-24px] w-[50px] h-[30px] bg-secondary border-[2px] border-primary z-30 flex justify-center items-center`}>
                        <div className="w-[20px] h-[10px] bg-background"></div>
                    </div>
                </div>
            </div>

            {/* ---> MACHINERY: TRACTOR (Gold & Ivory) <--- */}
            <div
                ref={tractorRef}
                className="absolute bottom-[3px] right-[100px] w-[50px] h-[24px] z-40"
            >
                {/* Body */}
                <div className="absolute bottom-[6px] left-[6px] w-[36px] h-[12px] bg-primary border-[2px] border-background rounded-tl-sm"></div>
                {/* Cabin */}
                <div className="absolute bottom-[16px] left-[26px] w-[16px] h-[16px] bg-background border-[2px] border-primary rounded-t-sm"></div>
                {/* Wheels */}
                <div className="absolute bottom-[0px] left-[2px] w-[14px] h-[14px] bg-dark border-[2px] border-primary rounded-full"></div>
                <div className="absolute bottom-[0px] left-[26px] w-[18px] h-[18px] bg-dark border-[2px] border-primary rounded-full"></div>
                {/* Bucket Arm */}
                <div className="absolute bottom-[8px] left-[-16px] w-[24px] h-[4px] bg-primary origin-right rotate-[30deg]">
                    {/* Bucket */}
                    <div className="absolute top-[-6px] left-[-4px] w-[10px] h-[10px] bg-background border-[2px] border-primary"></div>
                </div>
            </div>

        </div>
    );
}
