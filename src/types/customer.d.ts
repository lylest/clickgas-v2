export interface  ICustomerForm  {
    firstName: string;
    middleName: string | null;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    region: string;
    address: string;
    houseNo: string | null;
    password: string;
    tmpPassword: string;
}

export interface  ICustomerUpdateForm  {
    firstName: string;
    middleName: string | null;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    region: string;
    address: string;
    houseNo: string | null;
}

export interface ICustomer {
    id: string;
    firstName: string;
    middleName?: string | null;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    region: string;
    address: string;
    houseNo?: string | null;
    notificationToken: string;
    password: string;
    tmpPassword: string;
    customerStatus: string;
    createdAt: string;
    updatedAt: string;
}
