import {IPermission} from "@/types/permission";


const checkPermission = (permission: string, userPermissions: IPermission[]): boolean => {
    return userPermissions?.some((userPermission: IPermission) => userPermission.name === permission);
};

export default checkPermission;

export const permissions = {
    // File permissions
    UPLOAD_FILE: "UPLOAD_FILE" as const,
    GET_CREATOR_FILES: "GET_CREATOR_FILES" as const,
    DELETE_FILE: "DELETE_FILE" as const,

    // Customer permissions
    SIGN_UP_CUSTOMER: "SIGN_UP_CUSTOMER" as const,
    GET_CUSTOMERS: "GET_CUSTOMERS" as const,
    GET_CUSTOMER_DETAILS: "GET_CUSTOMER_DETAILS" as const,
    UPDATE_CUSTOMER: "UPDATE_CUSTOMER" as const,
    DELETE_CUSTOMER: "DELETE_CUSTOMER" as const,

    // Supplier permissions
    ADD_SUPPLIER: "ADD_SUPPLIER" as const,
    LIST_SUPPLIERS: "LIST_SUPPLIERS" as const,
    SUPPLIER_DETAILS: "SUPPLIER_DETAILS" as const,
    UPDATE_SUPPLIER: "UPDATE_SUPPLIER" as const,
    DELETE_SUPPLIER: "DELETE_SUPPLIER" as const,

    // Device permissions
    CREATE_DEVICE: "CREATE_DEVICE" as const,
    GET_DEVICES: "GET_DEVICES" as const,
    GET_DEVICE_DETAILS: "GET_DEVICE_DETAILS" as const,
    UPDATE_DEVICE: "UPDATE_DEVICE" as const,
    DELETE_DEVICE: "DELETE_DEVICE" as const,

    // Price permissions
    ADD_PRICE: "ADD_PRICE" as const,
    GET_ALL_PRICES: "GET_ALL_PRICES" as const,
    GET_PRICE_DETAILS: "GET_PRICE_DETAILS" as const,
    GET_SUPPLIER_PRICES: "GET_SUPPLIER_PRICES" as const,
    UPDATE_PRICE: "UPDATE_PRICE" as const,
    CHANGE_PRICE_STATUS: "CHANGE_PRICE_STATUS" as const,
    DELETE_PRICE: "DELETE_PRICE" as const,

    // Supplier Devices permissions
    ADD_SUPPLIER_DEVICE: "ADD_SUPPLIER_DEVICE" as const,
    GET_SUPPLIER_DEVICES: "GET_SUPPLIER_DEVICES" as const,
    GET_SUPPLIER_DEVICE_DETAILS: "GET_SUPPLIER_DEVICE_DETAILS" as const,
    DELETE_SUPPLIER_DEVICE: "DELETE_SUPPLIER_DEVICE" as const,

    // Customer Devices permissions
    ADD_CUSTOMER_DEVICE: "ADD_CUSTOMER_DEVICE" as const,
    DELETE_CUSTOMER_DEVICE: "DELETE_CUSTOMER_DEVICE" as const,
    GET_CUSTOMER_DEVICE_DETAILS: "GET_CUSTOMER_DEVICE_DETAILS" as const,
    GET_CUSTOMER_DEVICE_BY_DEVICE_ID: "GET_CUSTOMER_DEVICE_BY_DEVICE_ID" as const,

    // Order permissions
    ADD_ORDER: "ADD_ORDER" as const,
    GET_ORDERS: "GET_ORDERS" as const,
    GET_ORDER_DETAILS: "GET_ORDER_DETAILS" as const,
    CONFIRM_ORDER: "CONFIRM_ORDER" as const,
    CANCEL_ORDER: "CANCEL_ORDER" as const,
    UPDATE_ORDER_STATUS: "UPDATE_ORDER_STATUS" as const,
    UPDATE_ORDER_DISTANCE_ETA: "UPDATE_ORDER_DISTANCE_ETA" as const,

    // Payments permissions
    ADD_PAYMENT: "ADD_PAYMENT" as const,
    GET_PAYMENTS: "GET_PAYMENTS" as const,
    GET_PAYMENT_DETAILS: "GET_PAYMENT_DETAILS" as const,
    GET_ORDER_PAYMENTS: "GET_ORDER_PAYMENTS" as const,

    // Readings permissions
    ADD_READING: "ADD_READING" as const,
    GET_DEVICE_READINGS: "GET_DEVICE_READINGS" as const,

    // Permissions management
    ADD_PERMISSION: "ADD_PERMISSION" as const,
    GET_PERMISSIONS: "GET_PERMISSIONS" as const,
    UPDATE_PERMISSION: "UPDATE_PERMISSION" as const,
    DELETE_PERMISSION: "DELETE_PERMISSION" as const,

    // Role permissions
    ADD_ROLE: "ADD_ROLE" as const,
    GET_ROLES: "GET_ROLES" as const,
    UPDATE_ROLE: "UPDATE_ROLE" as const,
    DELETE_ROLE: "DELETE_ROLE" as const,
    GET_ROLE_DETAILS: "GET_ROLE_DETAILS" as const,

    // Role Permission management
    ADD_ROLE_PERMISSION: "ADD_ROLE_PERMISSION" as const,
    GET_ROLE_PERMISSIONS: "GET_ROLE_PERMISSIONS" as const,
    DELETE_ROLE_PERMISSION: "DELETE_ROLE_PERMISSION" as const,


};