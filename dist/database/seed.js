import { db } from "./client";
import coursesData from "../../courses.json";
import { course, hole } from "./schema/schema";
async function seedDatabase() {
    try {
        console.log("Connecting to database with URL:", process.env.DATABASE_URL);
        await db.transaction(async (tx) => {
            await tx.delete(course);
            for (const courseData of coursesData) {
                const insertedCourse = await tx
                    .insert(course)
                    .values({ name: courseData.name })
                    .returning({ insertedId: course.id });
                const courseId = insertedCourse[0].insertedId;
                console.log(courseId);
                for (const holeData of courseData.holes) {
                    await tx.insert(hole).values({
                        courseId: courseId,
                        number: holeData.number,
                        par: holeData.par,
                        lat: holeData.lat,
                        lng: holeData.lng,
                    });
                }
            }
        });
        console.log("Database seeded successfully");
    }
    catch (error) {
        console.error("Failed to seed database:", error);
    }
}
seedDatabase().catch((error) => {
    console.error("Failed to seed database:", error);
});
//# sourceMappingURL=seed.js.map