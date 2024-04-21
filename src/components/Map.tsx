import { Html } from "./Html";

export function MapPage() {
  return (
    <Html>
      <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div class="flex-initial">
          <h1
            id="homeButton"
            class="text-xl font-bold text-white mx-5 cursor-pointer"
          >
            Pin Hunters⛳
          </h1>
        </div>

        <div class="flex-grow text-center">
          <span id="distanceDisplay" class="hidden">
            🚩 Distance: <span id="distanceValue">0</span> yards 🚩
          </span>
        </div>

        <div class="flex space-x-4 flex-initial">
          <button
            id="addHoleBtn"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Find Distance
          </button>

          <button
            id="refreshLocationBtn"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            🔄
          </button>
        </div>
      </header>
      <div
        id="holePopup"
        class="hidden absolute top-0 left-0 right-0 bg-white shadow-md p-4"
      >
        <form id="holeForm" class="flex items-center">
          <h1 id="logo" class="text-xl font-bold text-blue-900 text-center mx-3 cursor-pointer">
            Pin Hunters⛳
          </h1>
          <label for="holeNumber" class="mr-2">
            Enter Hole:
          </label>
          <input
            type="number"
            id="holeNumber"
            name="holeNumber"
            min="1"
            max="18"
            required
            class="border-2 border-gray-200 rounded py-2 px-4 mr-2"
          />
          <input
            type="submit"
            value="Calculate"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          />
        </form>
      </div>
      <div id="map" class="w-full h-screen"></div>{" "}
      <script defer type="module" src="/index.js"></script>
      <script
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=initMap`}
      ></script>
    </Html>
  );
}
