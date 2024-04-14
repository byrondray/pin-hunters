import { CurrentLocation } from "./location";

export class CustomizedMap {
  private _googleMap: google.maps.Map;
  private _currentLocation: CurrentLocation;

  constructor(mapDiv: HTMLElement, location: { lat: number; lng: number }) {
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

    this.showCurrentLocation();
  }

  private async showCurrentLocation() {
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
    } catch (error) {
      console.error("Error getting the current location: ", error);
    }
  }
  public async updateCurrentLocation() {
    await this.showCurrentLocation(); 
  }
}
