import { jsx as _jsx, jsxs as _jsxs } from "jsxte/jsx-runtime";
import { Html } from "./Html";
export function MapPage() {
    return (_jsxs(Html, { children: [_jsxs("header", { class: "bg-gray-800 text-white p-4 flex justify-between items-center", children: [_jsx("div", { class: "flex-initial", children: _jsx("span", { id: "homeButton", class: "text-xl font-bold text-white mx-2 cursor-pointer", children: "Pin Hunters\u26F3" }) }), _jsxs("div", { class: "flex space-x-4 flex-initial", children: [_jsx("button", { id: "addHoleBtn", class: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded", children: "Find Distance" }), _jsx("button", { id: "refreshLocationBtn", class: "bg-blue-500 hover:bg-blue-700 text-white font-bold rounded text-2xl", children: "\uD83D\uDCCD" })] })] }), _jsx("div", { id: "holePopup", class: "hidden absolute inset-x-0 top-0 bg-white shadow-md p-4", children: _jsxs("form", { id: "holeForm", class: "grid grid-cols-3 gap-3 items-center", children: [_jsx("label", { for: "holeNumber", class: "col-span-1 text-right mr-2", children: "Enter Hole:" }), _jsx("input", { type: "number", id: "holeNumber", name: "holeNumber", min: "1", max: "18", required: true, class: "col-span-1 border-2 border-gray-200 rounded py-2 px-4" }), _jsx("input", { type: "submit", value: "Calculate", class: "col-span-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" })] }) }), _jsxs("span", { id: "distanceDisplay", class: "hidden absolute top-50 left-1/3 -translate-x-1/2 z-50 bg-white bg-opacity-80 py-2 px-4 rounded shadow-md", children: ["Distance: ", _jsx("span", { id: "distanceValue", children: "0" }), " yards"] }), _jsx("div", { id: "map", class: "w-full h-screen" }), " ", _jsx("script", { defer: true, type: "module", src: "/index.js" }), _jsx("script", { defer: true, src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=initMap` })] }));
}
//# sourceMappingURL=Map.js.map