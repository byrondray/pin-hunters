export class CurrentLocation {
    _location = null;
    constructor() {
        this.fetchLocation();
    }
    fetchLocation() {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this._location = {
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    };
                    resolve(this._location);
                }, (error) => {
                    console.error(`Error occurred. Error code: ${error.code}`);
                    reject(error);
                }, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                });
            }
            else {
                console.error("Geolocation is not supported by this browser.");
                reject(new Error("Geolocation is not supported by this browser."));
            }
        });
    }
    getLocation() {
        return this._location
            ? Promise.resolve(this._location)
            : this.fetchLocation();
    }
}
//# sourceMappingURL=location.js.map