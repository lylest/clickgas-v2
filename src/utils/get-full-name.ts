

export function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function getFullName(firstName: string, middleName: string, lastName: string): string {
    const middleInitial = middleName ? `${capitalize(middleName[0])}.` : '';
    return [capitalize(firstName), middleInitial, capitalize(lastName)].filter(Boolean).join(' ');
}
