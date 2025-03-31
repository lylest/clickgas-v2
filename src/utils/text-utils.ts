
export function truncateText(text: string | undefined, maxLength: number): string {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

export function cleanPhoneNumber(number:string) {
    let numberStr = number.toString();
    if (numberStr.startsWith("2550")) {
        numberStr = numberStr.replace(/^2550+/, "255");
    }

    return numberStr;
}