import { Html } from "./Html";

export function CourseList({ courseNames }: { courseNames: string[] }) {
  return (
    <Html>
      <h1>Available Courses</h1>
      <img
        src="https://static.wixstatic.com/media/c5f8a6_a6b3f27ce7a5492787e0f32f7b53faca~mv2.gif"
        class="golf-header"
        alt="golf"
      />
      <ul>
        {courseNames.map((name) => (
          <li>
            <form action="/select-course" method="post">
              <input type="hidden" name="courseName" value={name} />
              <button type="submit">{name}</button>
            </form>
          </li>
        ))}
      </ul>
    </Html>
  );
}
