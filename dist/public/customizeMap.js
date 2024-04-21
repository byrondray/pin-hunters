import { CurrentLocation } from "./location.js";
export class CustomizedMap {
    _googleMap;
    _currentLocation;
    holeMarkers;
    constructor(mapDiv, location) {
        this._currentLocation = new CurrentLocation();
        this._googleMap = new google.maps.Map(mapDiv, {
            zoom: 18,
            center: location,
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            tilt: 0,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
        });
        this.holeMarkers = new Map();
        this.showCurrentLocation();
    }
    async showCurrentLocation() {
        try {
            const loc = await this._currentLocation.getLocation();
            if (loc) {
                const marker = new google.maps.Marker({
                    position: { lat: loc.lat, lng: loc.long },
                    map: this._googleMap,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 7,
                        fillColor: "#4285F4",
                        fillOpacity: 1,
                        strokeWeight: 2,
                        strokeColor: "white",
                    },
                });
                this._googleMap.setCenter({ lat: loc.lat, lng: loc.long });
            }
        }
        catch (error) {
            console.error("Error getting the current location: ", error);
        }
    }
    async updateCurrentLocation() {
        await this.showCurrentLocation();
    }
    addHoleMarker(hole, holeNumber) {
        this.holeMarkers.forEach((marker, key) => {
            if (key !== holeNumber) {
                console.log(`Removing marker for hole number: ${key}`);
                marker.setMap(null);
                this.holeMarkers.delete(key);
            }
        });
        if (this.holeMarkers.has(holeNumber)) {
            console.log(`Updating marker for hole number: ${holeNumber}`);
            this.holeMarkers.get(holeNumber)?.setMap(null);
        }
        else {
            console.log(`Adding new marker for hole number: ${holeNumber}`);
        }
        const marker = new google.maps.Marker({
            position: { lat: hole.lat, lng: hole.lng },
            map: this._googleMap,
            icon: {
                path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                scale: 5,
                fillColor: "#FF6347",
                fillOpacity: 1,
                strokeWeight: 1,
                strokeColor: "white",
            },
            title: `Par ${hole.par}`,
        });
        this.holeMarkers.set(holeNumber, marker);
    }
}
//# sourceMappingURL=customizeMap.js.map