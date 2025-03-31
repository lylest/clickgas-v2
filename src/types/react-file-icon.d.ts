// src/types/react-file-icon.d.ts or src/react-file-icon.d.ts
declare module 'react-file-icon' {
    import { FC } from 'react';

    export const defaultStyles: Record<string, any>;

    export interface FileIconProps {
        extension: string;
        [key: string]: any;
    }

    export const FileIcon: FC<FileIconProps>;
}
