export class DistanceCalculator {
    earthRadiusKm = 6371;
    degreesToRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }
    calculateDistance(lat1, long1, lat2, long2) {
        const dLat = this.degreesToRadians(lat2 - lat1);
        const dLon = this.degreesToRadians(long2 - long1);
        lat1 = this.degreesToRadians(lat1);
        lat2 = this.degreesToRadians(lat2);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceInKilometers = this.earthRadiusKm * c;
        const distanceInYards = distanceInKilometers * 1093.61;
        return distanceInYards;
    }
}
//# sourceMappingURL=distanceCalculator.js.map