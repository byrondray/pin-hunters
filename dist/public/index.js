import { CustomizedMap } from "./customizeMap.js";
import { CurrentLocation } from "./location.js";
import { Course } from "./course.js";
import { CourseSessionManager } from "./api.js";
import { DistanceCalculator } from "./distanceCalculator.js";
const currentLocation = new CurrentLocation();
const distanceCalculator = new DistanceCalculator();
const courseSessionManager = new CourseSessionManager();
const golfCourse = new Course();
let customMap;
async function initializeCourseData() {
    try {
        await courseSessionManager.fetchCourseData();
        const courseData = courseSessionManager.getCourseData();
        if (courseData && courseData.holes) {
            golfCourse.setAllHoles(courseData.holes);
        }
        else {
            throw new Error("No holes data available for the selected course");
        }
    }
    catch (error) {
        console.error("An error occurred while initializing course data:", error);
    }
}
async function initMap() {
    const mapDiv = document.getElementById("map");
    if (mapDiv) {
        try {
            const currentLocation = new CurrentLocation();
            const location = await currentLocation.getLocation();
            if (location) {
                customMap = new CustomizedMap(mapDiv, {
                    lat: location.lat,
                    lng: location.long,
                });
            }
            else {
                console.error("Location is null or undefined.");
                customMap = new CustomizedMap(mapDiv, { lat: 60, lng: -135 });
            }
        }
        catch (Error) {
            console.error("Error getting current location:", Error);
            customMap = new CustomizedMap(mapDiv, { lat: 60, lng: -135 });
        }
    }
    else {
        console.error("Map div element not found.");
    }
}
document.addEventListener("DOMContentLoaded", async function () {
    await initializeCourseData();
    const addHoleButton = document.getElementById("addHoleBtn");
    const mainMenuButton = document.getElementById("mainMenuBtn");
    const refreshButton = document.getElementById("refreshLocationBtn");
    const holePopup = document.getElementById("holePopup");
    const holeForm = document.getElementById("holeForm");
    if (mainMenuButton) {
        mainMenuButton.addEventListener("click", () => {
            console.log("Ending session");
            courseSessionManager.endSession();
            window.location.href = "/";
        });
    }
    if (refreshButton) {
        refreshButton.addEventListener("click", async () => {
            console.log("Refreshing location");
            try {
                await customMap.updateCurrentLocation();
                console.log("Location updated");
            }
            catch (error) {
                console.error("Error updating location:", error);
            }
        });
    }
    if (addHoleButton && holePopup && holeForm) {
        addHoleButton.addEventListener("click", () => {
            addHoleButton.classList.add("hidden");
            holePopup.style.display = "block";
        });
        holeForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const holeNumberInput = document.getElementById("holeNumber");
            const holeNumber = parseInt(holeNumberInput.value);
            const hole = golfCourse.getHole(holeNumber);
            if (hole) {
                try {
                    const currentLoc = await currentLocation.getLocation();
                    if (currentLoc) {
                        const distance = distanceCalculator.calculateDistance(currentLoc.lat, currentLoc.long, hole.lat, hole.lng);
                        console.log(hole, "hole data");
                        customMap.addHoleMarker(hole, holeNumber);
                        alert(`Distance to hole ${holeNumber}: ${distance.toFixed(2)} yards`);
                        holePopup.style.display = "none";
                        addHoleButton.classList.remove("hidden");
                        holeNumberInput.value = "";
                    }
                    else {
                        alert("Current location is not available.");
                    }
                }
                catch (error) {
                    alert("Error calculating distance: " + error);
                }
            }
            else {
                alert("Invalid hole number.");
            }
        });
    }
});
window.initMap = initMap;
//# sourceMappingURL=index.js.map