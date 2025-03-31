export type LongLat = { lat: number; lng: number };
export interface Marker extends LongLat {
    type: "pulse" | "user";
}
