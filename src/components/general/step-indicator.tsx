import { useState } from 'react';

// Function to set loader percentage
const setLoaderPercentage = (percentage: number) => {
    const circumference = 62.83; // Circumference of the circle (2 * pi * radius)

    // Calculate the length of the stroke-dasharray based on the percentage
    const dashLength = (percentage / 100) * circumference;
    const dashArray = `${dashLength} ${circumference - dashLength}`;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="98"
            height="98"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1f7faa"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Background circle */}
            <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />

            {/* Filling circle representing loader */}
            <circle cx="12" cy="12" r="10" fill="none"  stroke="#1f7faa" strokeWidth="1.4" strokeDasharray={dashArray} />
        </svg>
    );
};

// Example usage
const StepIndicator = () => {
    const [percentage, setPercentage] = useState(40);

    // Increase percentage manually
    const increasePercentage = () => {
        setPercentage(percentage + 10);
        setLoaderPercentage(percentage + 10);
    };

    return (
        <div>
            <div>{setLoaderPercentage(percentage)}</div>
            <button onClick={increasePercentage}>Increase Percentage</button>
        </div>
    );
};

export default StepIndicator;
