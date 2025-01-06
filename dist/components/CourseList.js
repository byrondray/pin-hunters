import { jsx as _jsx, jsxs as _jsxs } from "jsxte/jsx-runtime";
import { Html } from "./Html";
export function CourseList({ courses }) {
    const serializedCourseNames = JSON.stringify(courses);
    return (_jsx(Html, { children: _jsxs("div", { class: "min-h-screen bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400", children: [_jsxs("nav", { class: "bg-blue-900 p-4 flex justify-between items-center", children: [_jsx("h1", { class: "text-xl font-bold text-white", children: "Pin Hunters\u26F3" }), _jsx("input", { id: "courseFilterInput", type: "text", oninput: "filterCourses(event)", placeholder: "Search courses", class: "p-2 rounded" })] }), _jsx("div", { class: "container mx-auto p-4", children: _jsx("ul", { id: "coursesContainer", class: "mt-10 space-y-4", children: courses.map((course) => (_jsx("li", { class: "list-none", children: _jsxs("form", { action: "/select-course", method: "post", children: [_jsx("input", { type: "hidden", name: "courseName", value: course.name }), _jsxs("button", { type: "submit", class: "bg-white text-blue-900 hover:bg-blue-100 font-semibold py-2 px-4 border border-blue-200 rounded shadow", children: [course.name, " - Total Par: ", course.totalPar] })] }) }))) }) }), _jsx("script", { children: `
          (function() {
            const courseNames = JSON.parse('${serializedCourseNames}');

            window.filterCourses = function(event) {
              var searchTerm = event.target.value.toLowerCase();
              var filteredCourseNames = courseNames.filter(function(name) {
                return name.toLowerCase().includes(searchTerm);
              });

              var coursesContainer = document.getElementById("coursesContainer");
              if (coursesContainer) {
                coursesContainer.innerHTML = "";
                filteredCourseNames.forEach(function(name) {
                  coursesContainer.innerHTML += 
                    '<li class="list-none">' +
                    '<form action="/select-course" method="post">' +
                    '<input type="hidden" name="courseName" value="' + name + '" />' +
                    '<button type="submit" class="bg-white text-blue-900 hover:bg-blue-100 font-semibold py-2 px-4 border border-blue-200 rounded shadow">' +
                    name +
                    '</button></form></li>';
                });
              }
            };

            document.addEventListener('DOMContentLoaded', function() {
              var searchInput = document.getElementById('courseFilterInput');
              if (searchInput) {
                searchInput.addEventListener('input', window.filterCourses);
              }
            });
          })();
        ` })] }) }));
}
//# sourceMappingURL=CourseList.js.map