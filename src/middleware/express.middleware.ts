import { db } from "../database/client";
import { course } from "../database/schema/schema";
import { eq } from "drizzle-orm";
import { Request, Response, NextFunction } from "express";

declare module "express-session" {
  interface SessionData {
    selectedCourse: string | undefined;
  }
}

async function checkCourseExistence(courseName: string): Promise<boolean> {
  const result = await db
    .select()
    .from(course)
    .where(eq(course.name, courseName))
  return result.length > 0;
}

export async function checkSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session.selectedCourse === undefined) {
    res.redirect("/");
  } else {
    await checkCourseExistence(req.session.selectedCourse)
      .then((exists) => {
        if (exists) {
          next();
        } else {
          req.session.selectedCourse = undefined;
          res.redirect("/");
        }
      })
      .catch((err) => {
        console.error("Error checking course existence:", err);
        next(err);
      });
  }
}
