import React, { useState, useRef } from 'react';
import gsap from 'gsap';

export default function Membership() {
    const [inputValue, setInputValue] = useState('');
    const [authStatus, setAuthStatus] = useState('idle'); // idle, loading, error, success
    const formRef = useRef(null);

    const handleAuthenticate = (e) => {
        e.preventDefault();

        if (inputValue.trim() === '') return;

        setAuthStatus('loading');

        setTimeout(() => {
            if (inputValue.toUpperCase() === 'COMFORT') {
                setAuthStatus('success');
            } else {
                setAuthStatus('error');
                // Shake animation for error
                gsap.fromTo(formRef.current,
                    { x: -5 },
                    {
                        x: 5, duration: 0.1, yoyo: true, repeat: 5, onComplete: () => {
                            gsap.set(formRef.current, { x: 0 });
                            setTimeout(() => setAuthStatus('idle'), 2000);
                        }
                    }
                );
            }
        }, 1200);
    };

    return (
        <section className="bg-background py-32 px-6 relative w-full border-t border-dark/10">
            <div className="max-w-4xl mx-auto rounded-[3rem] bg-dark p-12 md:p-24 text-center overflow-hidden relative shadow-2xl min-h-[500px] flex items-center justify-center">
                {/* Background Texture & Grain */}
                <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none mix-blend-overlay"></div>

                {/* Dynamic Blur Glow based on status */}
                <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-30 -translate-y-1/2 translate-x-1/4 pointer-events-none transition-colors duration-700
                    ${authStatus === 'success' ? 'bg-green-500' : authStatus === 'error' ? 'bg-red-500' : 'bg-accent/20'}`}>
                </div>

                <div className="relative z-10 flex flex-col items-center w-full">
                    {authStatus === 'success' ? (
                        <div className="animate-fade-in flex flex-col items-center">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full border border-green-500/30 mb-8 bg-green-500/10">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <span className="font-mono text-green-500 text-xs tracking-widest uppercase mb-6 block">Authorization Confirmed</span>
                            <h2 className="font-serif italic text-4xl md:text-5xl text-background leading-none mb-6 tracking-tight">
                                Handshake Complete.
                            </h2>
                            <p className="font-sans text-background/60 text-sm md:text-base max-w-sm mx-auto font-light">
                                Establishing secure connection to off-ledger asset pools. Stand by for encrypted routing...
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className={`w-12 h-12 flex items-center justify-center rounded-full border mb-8 mt-4 transition-colors duration-500
                                ${authStatus === 'error' ? 'border-red-500/30 bg-red-500/10' : 'border-background/20'}`}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className={authStatus === 'error' ? 'text-red-500' : 'text-background md:text-background/80'}>
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d={authStatus === 'error' ? "M7 11V7a5 5 0 0 1 10 0v4" : "M7 11V7a5 5 0 0 1 9.9-1"}></path>
                                </svg>
                            </div>

                            <span className="font-mono text-accent text-xs tracking-widest uppercase mb-6 block">Private Syndicate Portal</span>

                            <h2 className="font-serif italic text-4xl md:text-6xl text-background leading-none mb-6 tracking-tight drop-shadow-sm">
                                Verified Access Only.
                            </h2>

                            <p className="font-sans text-background/60 text-sm md:text-base max-w-md mx-auto mb-16 font-light">
                                Exclusive portfolio tracking, live yield ledgers, and priority acquisition access for accredited institutional partners.
                            </p>

                            <form ref={formRef} className="w-full max-w-sm flex flex-col gap-6" onSubmit={handleAuthenticate}>
                                <div className="relative group">
                                    <input
                                        type="password"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        disabled={authStatus === 'loading'}
                                        placeholder="[ SYNDICATE CREDENTIALS ]"
                                        className={`w-full bg-transparent border-b px-4 py-3 text-center text-background font-mono text-sm tracking-widest focus:outline-none transition-colors placeholder:text-background/30 disabled:opacity-50
                                            ${authStatus === 'error' ? 'border-red-500 text-red-500' : 'border-background/20 focus:border-accent'}`}
                                    />
                                    {authStatus !== 'error' && (
                                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent origin-center scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out"></div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={authStatus === 'loading'}
                                    className={`magnetic-btn bg-background px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 group mt-4
                                        ${authStatus === 'error' ? 'text-red-600' : 'text-dark hover:shadow-2xl hover:shadow-background/20'}`}
                                >
                                    {authStatus !== 'error' && <span className="magnetic-btn-bg bg-accent"></span>}
                                    <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-background transition-colors duration-300">
                                        {authStatus === 'loading' ? 'Authenticating...' : authStatus === 'error' ? 'Access Denied' : 'Authenticate'}
                                        {authStatus === 'idle' && (
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                        )}
                                    </span>
                                </button>
                            </form>

                            <p className="font-sans text-background/30 text-[10px] uppercase tracking-widest mt-16 font-bold">
                                Encrypted &bull; Institutional Routing &bull; AES-256
                            </p>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
