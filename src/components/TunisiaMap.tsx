import React from 'react';

const TunisiaMap: React.FC = () => {
    return (
        <div className="relative flex items-center justify-center gap-6">
            {/* Main Map Container with Orbital Particles */}
            <div className="relative">
                {/* Outer Orbital Ring 1 */}
                <div className="absolute inset-0 -m-8">
                    <div className="w-full h-full rounded-full border border-teal-500/20 animate-spin-slow" style={{ animationDuration: '20s' }}>
                        {/* Orbital Particles */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-teal-400 rounded-full shadow-lg shadow-teal-400/50" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
                    </div>
                </div>

                {/* Outer Orbital Ring 2 - Counter rotation */}
                <div className="absolute inset-0 -m-12">
                    <div className="w-full h-full rounded-full border border-cyan-500/15 animate-spin-slow" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50" />
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-red-400 rounded-full shadow-lg shadow-red-400/50" />
                    </div>
                </div>

                {/* Inner Orbital Ring */}
                <div className="absolute inset-0 -m-4">
                    <div className="w-full h-full rounded-full border border-teal-400/25 animate-spin-slow" style={{ animationDuration: '15s' }}>
                        <div className="absolute top-1/4 right-0 translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-lg shadow-white/50" />
                        <div className="absolute bottom-1/4 left-0 -translate-x-1/2 w-1.5 h-1.5 bg-teal-300 rounded-full shadow-lg shadow-teal-300/50" />
                    </div>
                </div>


                {/* Tunisia Map Image - Resized smaller */}
                <div className="relative w-48 h-auto drop-shadow-2xl">
                    <img
                        src="/tnmap.png"
                        alt="Tunisia Map"
                        className="w-full h-auto object-contain"
                        style={{
                            filter: 'invert(1) brightness(0.9) contrast(1.1)',
                            opacity: 0.9,
                        }}
                    />

                </div>

                {/* Floating Particles Around Map */}
                <div className="absolute -top-3 -right-3 w-1 h-1 bg-teal-400 rounded-full animate-pulse" style={{ animationDuration: '2s' }} />
                <div className="absolute -bottom-2 -left-4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                <div className="absolute top-1/3 -right-5 w-1 h-1 bg-orange-400 rounded-full animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />
                <div className="absolute bottom-1/4 -left-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDuration: '2s', animationDelay: '1.5s' }} />
            </div>

            {/* Tunisia Flag */}
            <div className="flex flex-col items-center gap-3">
                {/* Flag Container with elegant styling */}
                <div className="relative group">
                    {/* Flag glow effect */}
                    <div className="absolute inset-0 bg-red-500/20 rounded-lg blur-xl group-hover:bg-red-500/30 transition-all duration-500" />

                 
                   
                </div>

                {/* Label */}
                <span className="text-xs font-medium text-slate-400 tracking-wider uppercase">Tunisia</span>
            </div>
        </div>
    );
};

export default TunisiaMap;
