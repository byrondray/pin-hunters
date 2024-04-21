import { Html } from "./Html";

export function MapPage() {
  return (
    <Html>
      <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div class="flex-initial">
          <span
            id="homeButton"
            class="text-xl font-bold text-white mx-2 cursor-pointer"
          >
            Pin Hunters⛳
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
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded text-2xl"
          >
            🔄
          </button>
        </div>
      </header>
      <div
        id="holePopup"
        class="hidden absolute inset-x-0 top-0 bg-white shadow-md p-4"
      >
        <form id="holeForm" class="grid grid-cols-3 gap-3 items-center">
          <label for="holeNumber" class="col-span-1 text-right mr-2">
            Enter Hole:
          </label>
          <input
            type="number"
            id="holeNumber"
            name="holeNumber"
            min="1"
            max="18"
            required
            class="col-span-1 border-2 border-gray-200 rounded py-2 px-4"
          />
          <input
            type="submit"
            value="Calculate"
            class="col-span-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          />
        </form>
      </div>
      <span
        id="distanceDisplay"
        class="hidden absolute top-50 left-1/3 -translate-x-1/2 z-50 bg-white bg-opacity-80 py-2 px-4 rounded shadow-md"
      >
        Distance: <span id="distanceValue">0</span> yards
      </span>
      <div id="map" class="w-full h-screen"></div>{" "}
      <script defer type="module" src="/index.js"></script>
      <script
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=initMap`}
      ></script>
    </Html>
  );
}
