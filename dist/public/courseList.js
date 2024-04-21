window.filterCourses = function (event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredCourseNames = courseNames.filter((name) => name.toLowerCase().includes(searchTerm));
    const coursesContainer = document.getElementById("coursesContainer");
    if (coursesContainer) {
        coursesContainer.innerHTML = "";
        filteredCourseNames.forEach((name) => {
            coursesContainer.innerHTML += `
          <li class="list-none">
            <form action="/select-course" method="post">
              <input type="hidden" name="courseName" value="${name}" />
              <button
                type="submit"
                class="bg-white text-blue-900 hover:bg-blue-100 font-semibold py-2 px-4 border border-blue-200 rounded shadow"
              >
                ${name}
              </button>
            </form>
          </li>
        `;
        });
    }
};
if (typeof window !== "undefined" && typeof window.document !== "undefined") {
    // at the end of your HTML template or an equivalent method to ensure this runs
    // at the correct time.
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('courseFilterInput');
        if (searchInput) {
            searchInput.addEventListener('input', (event) => {
                window.filterCourses && window.filterCourses(event);
            });
        }
    });
}
//# sourceMappingURL=courseList.js.map