import { useState, useRef, useEffect, useCallback } from 'react';

interface MatchingQuestionProps {
    leftItems: string[];
    rightItems: string[];
    correctMatches: { [leftIndex: number]: number };
    onSubmit: (userMatches: { [leftIndex: number]: number }, isCorrect: boolean) => void;
    showResults: boolean;
    userMatches?: { [leftIndex: number]: number };
}

interface Connection {
    leftIndex: number;
    rightIndex: number;
}

export default function MatchingQuestion({
    leftItems,
    rightItems,
    correctMatches,
    onSubmit,
    showResults,
    userMatches: initialUserMatches
}: MatchingQuestionProps) {
    const [connections, setConnections] = useState<Connection[]>([]);
    const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
    const [dragLine, setDragLine] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
    const rightRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Initialize with user matches if provided (for results view)
    useEffect(() => {
        if (initialUserMatches && showResults) {
            const conns: Connection[] = [];
            Object.entries(initialUserMatches).forEach(([left, right]) => {
                conns.push({ leftIndex: parseInt(left), rightIndex: right as number });
            });
            setConnections(conns);
        }
    }, [initialUserMatches, showResults]);

    const getItemPosition = useCallback((ref: HTMLDivElement | null, side: 'left' | 'right') => {
        if (!ref || !containerRef.current) return { x: 0, y: 0 };
        const containerRect = containerRef.current.getBoundingClientRect();
        const itemRect = ref.getBoundingClientRect();
        return {
            x: side === 'left' ? itemRect.right - containerRect.left : itemRect.left - containerRect.left,
            y: itemRect.top - containerRect.top + itemRect.height / 2
        };
    }, []);

    const handleLeftClick = (index: number) => {
        if (showResults) return;

        // Check if already connected
        const existingConnection = connections.find(c => c.leftIndex === index);
        if (existingConnection) {
            // Remove connection
            setConnections(prev => prev.filter(c => c.leftIndex !== index));
            setSelectedLeft(null);
        } else {
            setSelectedLeft(index);
        }
    };

    const handleRightClick = (index: number) => {
        if (showResults) return;
        if (selectedLeft === null) return;

        // Remove any existing connection from this left item
        const newConnections = connections.filter(c => c.leftIndex !== selectedLeft);

        // Add new connection
        newConnections.push({ leftIndex: selectedLeft, rightIndex: index });
        setConnections(newConnections);
        setSelectedLeft(null);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (selectedLeft === null || !containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const leftPos = getItemPosition(leftRefs.current[selectedLeft], 'left');
        setDragLine({
            x1: leftPos.x,
            y1: leftPos.y,
            x2: e.clientX - containerRect.left,
            y2: e.clientY - containerRect.top
        });
    };

    // Clear drag line when mouse leaves (but keep selectedLeft for click-based interaction)
    const handleMouseLeave = () => {
        setDragLine(null);
    };

    const handleSubmit = () => {
        const userMatches: { [key: number]: number } = {};
        connections.forEach(c => {
            userMatches[c.leftIndex] = c.rightIndex;
        });

        // Check correctness
        let correctCount = 0;
        let totalRequired = Object.keys(correctMatches).length;

        Object.entries(correctMatches).forEach(([left, right]) => {
            if (userMatches[parseInt(left)] === right) {
                correctCount++;
            }
        });

        const isCorrect = correctCount === totalRequired && connections.length === totalRequired;
        onSubmit(userMatches, isCorrect);
    };

    const getLineColor = (connection: Connection) => {
        if (!showResults) return '#3b82f6'; // blue

        const isCorrect = correctMatches[connection.leftIndex] === connection.rightIndex;
        return isCorrect ? '#22c55e' : '#ef4444'; // green or red
    };

    const isItemCorrectlyMatched = (leftIndex: number) => {
        if (!showResults) return null;
        const userConnection = connections.find(c => c.leftIndex === leftIndex);
        if (!userConnection) {
            // Check if it should have been matched
            return correctMatches[leftIndex] !== undefined ? false : null;
        }
        return correctMatches[leftIndex] === userConnection.rightIndex;
    };

    const getMissingConnections = () => {
        if (!showResults) return [];
        const missing: Connection[] = [];
        Object.entries(correctMatches).forEach(([left, right]) => {
            const leftIdx = parseInt(left);
            const userConnection = connections.find(c => c.leftIndex === leftIdx);
            if (!userConnection || userConnection.rightIndex !== right) {
                missing.push({ leftIndex: leftIdx, rightIndex: right as number });
            }
        });
        return missing;
    };

    return (
        <div
            ref={containerRef}
            className="relative select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* SVG for lines */}
            <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
                style={{ overflow: 'visible' }}
            >
                {/* Existing connections */}
                {connections.map((conn, idx) => {
                    const leftPos = getItemPosition(leftRefs.current[conn.leftIndex], 'left');
                    const rightPos = getItemPosition(rightRefs.current[conn.rightIndex], 'right');
                    return (
                        <line
                            key={idx}
                            x1={leftPos.x}
                            y1={leftPos.y}
                            x2={rightPos.x}
                            y2={rightPos.y}
                            stroke={getLineColor(conn)}
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="transition-all duration-300"
                        />
                    );
                })}

                {/* Missing connections (shown in results) */}
                {showResults && getMissingConnections().map((conn, idx) => {
                    const leftPos = getItemPosition(leftRefs.current[conn.leftIndex], 'left');
                    const rightPos = getItemPosition(rightRefs.current[conn.rightIndex], 'right');
                    return (
                        <line
                            key={`missing-${idx}`}
                            x1={leftPos.x}
                            y1={leftPos.y}
                            x2={rightPos.x}
                            y2={rightPos.y}
                            stroke="#22c55e"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            strokeLinecap="round"
                            className="transition-all duration-300"
                        />
                    );
                })}

                {/* Drag line */}
                {dragLine && (
                    <line
                        x1={dragLine.x1}
                        y1={dragLine.y1}
                        x2={dragLine.x2}
                        y2={dragLine.y2}
                        stroke="#94a3b8"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        strokeLinecap="round"
                    />
                )}
            </svg>

            <div className="flex justify-between gap-8">
                {/* Left column - Characteristics */}
                <div className="flex-1 space-y-3">
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 text-center">
                        Caractéristiques
                    </h4>
                    {leftItems.map((item, index) => {
                        const isSelected = selectedLeft === index;
                        const isConnected = connections.some(c => c.leftIndex === index);
                        const correctStatus = isItemCorrectlyMatched(index);

                        let bgClass = 'bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 border-2 border-transparent';

                        if (showResults) {
                            if (correctStatus === true) {
                                bgClass = 'bg-green-50 dark:bg-green-900/30 border-2 border-green-500';
                            } else if (correctStatus === false) {
                                bgClass = 'bg-red-50 dark:bg-red-900/30 border-2 border-red-500';
                            }
                        } else if (isSelected) {
                            bgClass = 'bg-blue-100 dark:bg-blue-900/50 border-2 border-blue-500 shadow-lg';
                        } else if (isConnected) {
                            bgClass = 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-400';
                        }

                        return (
                            <div
                                key={index}
                                ref={el => leftRefs.current[index] = el}
                                onClick={() => handleLeftClick(index)}
                                className={`p-3 rounded-xl cursor-pointer transition-all text-sm ${bgClass}`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                    {isConnected && !showResults && (
                                        <span className="ml-auto text-blue-500">●</span>
                                    )}
                                    {showResults && correctStatus === true && (
                                        <span className="ml-auto text-green-500">✓</span>
                                    )}
                                    {showResults && correctStatus === false && (
                                        <span className="ml-auto text-red-500">✗</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Right column - Methods */}
                <div className="flex-1 space-y-3">
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 text-center">
                        Méthodes de transfert
                    </h4>
                    {rightItems.map((item, index) => {
                        const connectedCount = connections.filter(c => c.rightIndex === index).length;

                        let bgClass = 'bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 border-2 border-purple-300 dark:border-purple-700';

                        if (selectedLeft !== null) {
                            bgClass = 'bg-purple-100 dark:bg-purple-900/50 border-2 border-purple-500 shadow-lg cursor-pointer';
                        }

                        return (
                            <div
                                key={index}
                                ref={el => rightRefs.current[index] = el}
                                onClick={() => handleRightClick(index)}
                                className={`p-4 rounded-xl transition-all ${bgClass}`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-purple-700 dark:text-purple-300">{item}</span>
                                    {connectedCount > 0 && (
                                        <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                                            {connectedCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Instructions */}
            {!showResults && (
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        {selectedLeft !== null
                            ? "👆 Cliquez sur une méthode de transfert à droite pour créer la connexion"
                            : "👈 Cliquez sur une caractéristique à gauche, puis sur une méthode à droite"}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        Cliquez sur une caractéristique déjà connectée pour supprimer la connexion
                    </p>
                </div>
            )}

            {/* Submit button */}
            {!showResults && (
                <button
                    onClick={handleSubmit}
                    disabled={connections.length === 0}
                    className={`w-full mt-6 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${connections.length > 0
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                        : 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        }`}
                >
                    Valider les associations ({connections.length} connexions)
                </button>
            )}
        </div>
    );
}
