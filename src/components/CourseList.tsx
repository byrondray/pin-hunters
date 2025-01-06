import { Html } from './Html';

type Course = {
  name: string;
  totalPar: number;
};

type CourseListProps = {
  courses: Course[];
};

export function CourseList({ courses }: CourseListProps) {
  const serializedCourseNames = JSON.stringify(courses);
  return (
    <Html>
      <div class='min-h-screen bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400'>
        <nav class='bg-blue-900 p-4 flex justify-between items-center'>
          <h1 class='text-xl font-bold text-white'>Pin Hunters⛳</h1>
          <input
            id='courseFilterInput'
            type='text'
            oninput='filterCourses(event)'
            placeholder='Search courses'
            class='p-2 rounded'
          />
        </nav>
        <div class='container mx-auto p-4'>
          <ul id='coursesContainer' class='mt-10 space-y-4'>
            {courses.map((course) => (
              <li class='list-none'>
                <form action='/select-course' method='post'>
                  <input type='hidden' name='courseName' value={course.name} />
                  <button
                    type='submit'
                    class='bg-white text-blue-900 hover:bg-blue-100 font-semibold py-2 px-4 border border-blue-200 rounded shadow'
                  >
                    {course.name} - Total Par: {course.totalPar}
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>
        <script>
          {`
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
        `}
        </script>
      </div>
    </Html>
  );
}
