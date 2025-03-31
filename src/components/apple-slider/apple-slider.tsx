import React, { useState } from 'react';
import { Sun } from 'lucide-react';

const AdjustmentSlider = () => {
    const [brightness, setBrightness] = useState<number>(75);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;

        const container = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - container.left;
        const width = container.width;

        let percentage = (x / width * 100);
        percentage = Math.max(0, Math.min(100, percentage));

        setBrightness(Math.round(percentage));
    };

    // Get fill color based on brightness level
    const getFillColor = () => {
        if (brightness <= 15) return 'bg-red-500';
        if (brightness >= 85) return 'bg-amber-400';
        return 'bg-blue-500';
    };

    // Get text color based on brightness level
    const getTextColor = () => {
        if (brightness <= 15) return 'text-red-500';
        if (brightness >= 85) return 'text-amber-500';
        return 'text-gray-700';
    };


    React.useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-4 p-4">
                {/* Main pill container */}
                <div
                    className="relative h-12 w-32 rounded-full bg-gray-200 cursor-pointer overflow-hidden"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    {/* Filled background with dynamic color */}
                    <div
                        className={`absolute top-0 bottom-0 left-0 transition-all duration-100 ${getFillColor()}`}
                        style={{ width: `${brightness}%` }}
                    />

                    {/* Brightness indicators */}
                    <div className="absolute inset-0 flex justify-between items-center px-3">
                        <Sun className="w-4 h-4 text-gray-600 opacity-30" />
                    </div>

                    {/* Pill overlay for shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                </div>

                {/* Brightness percentage with dynamic color */}
                <div className={`text-sm font-medium min-w-8 ${getTextColor()}`}>
                    {brightness}%
                </div>
            </div>

        </div>
    );
};

export default AdjustmentSlider;
