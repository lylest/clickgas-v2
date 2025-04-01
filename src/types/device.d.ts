
interface GPSCoordinates {
    latitude: number;
    longitude: number;
}

export interface IDeviceForm {
    gpsCoordinates: GPSCoordinates;
    serialNumber: string;
}

export interface IDevice {
    id: string;
    gpsCoordinates: GPSCoordinates;
    serialNumber: string;
    deviceStatus: string;
    createdAt: string;
    updatedAt: string;
}

export interface IDeviceReading {
        id: string;
        deviceId: string;
        amount: number;
        battery: number;
        createdAt: string;
}