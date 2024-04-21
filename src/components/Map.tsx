import { Html } from "./Html";

export function MapPage() {
  return (
    <Html>
      <header class="bg-gray-800 text-white p-4">
        <div class="container mx-auto flex justify-between items-center">
          <button id="addHoleBtn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Find Distance
          </button>
          <button id="mainMenuBtn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Main Menu
          </button>
          <button id="refreshLocationBtn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            🔄
          </button>
        </div>
      </header>
      <div id="holePopup" class="hidden absolute top-0 left-0 right-0 bg-white shadow-md p-4">
        <form id="holeForm" class="flex justify-between items-center">
          <label for="holeNumber" class="mr-2">Enter Hole:</label>
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
            value="Check Distance" 
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          />
        </form>
      </div>
      <div id="map" class="w-full h-screen"></div> {/* You can adjust the height as needed */}
      <script defer type="module" src="/index.js"></script>
      <script
        defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBQ92jAHUBxg2Z1nVYjyXQ1rcibkda7hjg&callback=initMap"
      ></script>
    </Html>
  );
}
