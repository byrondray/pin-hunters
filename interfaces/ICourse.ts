export interface Course {
    name: string;
    holes: Hole[];
}

export interface Hole {
    par: number;
    lat: number;
    lng: number;
}