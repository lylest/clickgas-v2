
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