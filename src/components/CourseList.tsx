import { Html } from "./Html";

export function CourseList({ courseNames }: { courseNames: string[] }) {
  return (
    <Html>
      <div class="min-h-screen bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400">
        <nav class="bg-blue-900 p-4">
          <h1 class="text-xl font-bold text-white text-center">
            Pin Hunters⛳
          </h1>
        </nav>
        <div class="container mx-auto p-4">
          <ul class="mt-10 space-y-4">
            {courseNames.map((name) => (
              <li class="list-none">
                <form action="/select-course" method="post">
                  <input type="hidden" name="courseName" value={name} />
                  <button
                    type="submit"
                    class="bg-white text-blue-900 hover:bg-blue-100 font-semibold py-2 px-4 border border-blue-200 rounded shadow"
                  >
                    {name}
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Html>
  );
}
