import {defaultStyles} from "react-file-icon";

interface FileSizeResult {
    size: number;
    unit: "B" | "KB" | "MB" | "GB" | "TB";
}

export const getFileSize = (file: File  | never ): FileSizeResult => {
    const BYTES_PER_KB = 1024;
    const BYTES_PER_MB = BYTES_PER_KB * 1024;
    const BYTES_PER_GB = BYTES_PER_MB * 1024;
    const BYTES_PER_TB = BYTES_PER_GB * 1024;

    const bytes = file.size;

    let size: number;
    let unit: "B" | "KB" | "MB" | "GB" | "TB";

    switch (true) {
        case bytes < BYTES_PER_KB:
            size = bytes;
            unit = "B";
            break;
        case bytes < BYTES_PER_MB:
            size = bytes / BYTES_PER_KB;
            unit = "KB";
            break;
        case bytes < BYTES_PER_GB:
            size = bytes / BYTES_PER_MB;
            unit = "MB";
            break;
        case bytes < BYTES_PER_TB:
            size = bytes / BYTES_PER_GB;
            unit = "GB";
            break;
        default:
            size = bytes / BYTES_PER_TB;
            unit = "TB";
            break;
    }

    return { size, unit };
};

type FileExtension = keyof typeof defaultStyles; // Type for valid file extensions

export const getFileExtension = (fileName: string): FileExtension => {
    const extension = fileName.split('.').pop() as FileExtension;
    return extension in defaultStyles ? extension : 'doc'; // Default to 'doc' if invalid
};
