import { jsx as _jsx, jsxs as _jsxs } from "jsxte/jsx-runtime";
import { Html } from "./Html";
export function CourseList({ courseNames }) {
    return (_jsx(Html, { children: _jsxs("div", { class: "min-h-screen bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400", children: [_jsx("nav", { class: "bg-blue-900 p-4", children: _jsx("h1", { class: "text-xl font-bold text-white text-center", children: "Pin Hunters\u26F3" }) }), _jsx("div", { class: "container mx-auto p-4", children: _jsx("ul", { class: "mt-10 space-y-4", children: courseNames.map((name) => (_jsx("li", { class: "list-none", children: _jsxs("form", { action: "/select-course", method: "post", children: [_jsx("input", { type: "hidden", name: "courseName", value: name }), _jsx("button", { type: "submit", class: "bg-white text-blue-900 hover:bg-blue-100 font-semibold py-2 px-4 border border-blue-200 rounded shadow", children: name })] }) }))) }) })] }) }));
}
//# sourceMappingURL=CourseList.js.map