export interface LogoFile {
    id: string;
    name: string;
    size: number;
    type: string;
    ext: string;
    bucketUrl: string;
    createdBy: string;
    fileStatus: string;
    createdAt: string;
    updatedAt: string;
}

export interface IShop {
    id: string;
    name: string;
    description: string;
    address: string;
    logo: string;
    logoFile: LogoFile;
    createdBy: string;
    shopStatus: string;
    createdAt: string;
    updatedAt: string;
}

export interface IShopForm {
    name: string;
    description: string;
    address: string;
    logo: string;
}

export interface IShopContact {
    id: string;
    phone: string;
    email: string;
    fax: string;
    instagram: string;
    whatsapp: string;
    x: string;
    shopId: string;
    createdBy: string;
    contactStatus: string;
    createdAt: string;
    updatedAt: string;
}

export interface IShopContactForm {
    phone: string;
    email?: string | null;
    fax?: string | null;
    instagram?: string | null;
    whatsapp?: string | null;
    x?: string | null;
    shopId: string;
}