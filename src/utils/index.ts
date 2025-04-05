import clsx, { ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from 'uuid';


/**
 * Adds an object to a collection if a condition is met.
 * @param condition - The expression to evaluate.
 * @param objectToAdd - The object to add to the collection.
 * @return array of an object to be added or empty array
 */

type QueryParams = { [key: string]: string | number | boolean | undefined };

export const addObjectIfConditionMet = <T>(
    condition: boolean,
    objectToAdd: T,
): T[] => {
    if (condition) {
        return [objectToAdd];
    }
    return [];
};

/**
 * Generate random id every time it called
 * @return random as id, example sgs86tp1zo
 * */
export const randomId = () => Math.random().toString(36).slice(2);

export const isDevEnvironment = () => {
    return import.meta.env.MODE === "development";
};

export const isFormData = <T>(payload: T): boolean => {
    return payload instanceof FormData;
};


export const cn = (...input: ClassValue[]) => {
    return twMerge(clsx(input));
};

export const generateQueryParams = (params: QueryParams): string => {
    const queryParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
        if (value) {
            queryParams.append(key, value.toString());
        }
    }

    return queryParams.toString();
};

export const getRandomColor = () => {
    const shades = ['#cd2949', '#2d6384', '#635a54', '#c78257', '#4c6b22'];
    return shades[Math.floor(Math.random() * shades.length)];
};

export function capitalizeFirstLetter(word: string): string {
    if (word.length === 0) {
        return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
}


export function formatDate(date: string): string {
    return format(date, "MMMM dd, yyyy hh:mm aa");
}



export interface BreadItem {
    label:string;
    link:string;
    separator?:boolean
}

export const FILES_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const DEFAULT_IMG = import.meta.env.VITE_DEFAULT_IMG;


export const generateUUID = (): string => {
    return uuidv4();
};



export interface IDocumentForm {
    name: string;
    doctype?: string;
    size: number;
    owner?: string;
    file?: string;
    _id?:string;
    InsertedID?:string;
}

