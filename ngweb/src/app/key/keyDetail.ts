export interface KeyDetail {
    midiType: number; // 144 for piano
    keyPressed: number; // 60 = C in C3 (DO de clave de sol)
    pressure: 0; // max 118? receive 2 one for start hold and the second with 0 for release
    deviceName: string;
}