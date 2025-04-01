

import {intervalToDuration, formatDuration, format} from "date-fns";

export const formatSecondsToDuration = (seconds: number): string => {
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
    return (
        formatDuration(duration, { format: ["hours", "minutes", "seconds"], zero: true })
            .replace(/(\d+)/g, "$1")
            .replace("hours", "h")
            .replace("minutes", "m")
            .replace("seconds", "s") || "0h 0m 0s"
    );
};



export const formatCurrency = (amount: number | bigint, currency: string) => {
    return new Intl.NumberFormat(currency === 'TZS' ? 'sw-TZ' : 'en-US', {
        style: 'currency',
        currency: currency || 'TZS',
        maximumFractionDigits: 0
    }).format(amount);
};

// Format date
export const formatDate = (dateString: string | number | Date) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "PPP 'at' p");
};