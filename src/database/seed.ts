import { db } from "./client";
import coursesData from "../../courses.json";
import { course, hole } from "./schema/schema";

async function seedDatabase() {
  console.log("Starting database seeding process...");

  try {
    await db.transaction(async (tx) => {
      console.log("Clearing existing data from 'hole' and 'course' tables.");
      await tx.delete(hole);
      console.log("Deleted all data from 'hole' table.");
      await tx.delete(course);
      console.log("Deleted all data from 'course' table.");

      console.log("Beginning to insert new course data...");
      for (const courseData of coursesData) {
        console.log(`Inserting course: ${courseData.name}`);
        const insertedCourse = await tx
          .insert(course)
          .values({ name: courseData.name })
          .returning({ insertedId: course.id });

        const courseId = insertedCourse[0].insertedId;
        console.log(`Inserted course with ID: ${courseId}`);

        console.log(`Inserting holes for course ID ${courseId}...`);
        for (const holeData of courseData.holes) {
          console.log(`Inserting hole number: ${holeData.number}`);
          await tx.insert(hole).values({
            courseId: courseId,
            number: holeData.number,
            par: holeData.par,
            lat: holeData.lat,
            lng: holeData.lng,
          });
          console.log(`Inserted hole number ${holeData.number} for course ID ${courseId}.`);
        }
      }
    });

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Failed to seed database:", error);
  }
}

seedDatabase().catch((error) => {
  console.error("Seeding process encountered an error:", error);
});
