import express from "express";
import path, { dirname } from "path";
import connectLiveReload from "connect-livereload";
import session from "express-session";
import { db } from "../database/client";
import { course } from "../database/schema/schema";
import { fileURLToPath } from "url";
import { eq } from "drizzle-orm";
const __dirname = dirname(fileURLToPath(import.meta.url));
async function checkCourseExistence(courseName) {
    const result = await db
        .select()
        .from(course)
        .where(eq(course.name, courseName));
    return result.length > 0;
}
async function checkSession(req, res, next) {
    if (req.session.selectedCourse === undefined) {
        res.redirect("/");
    }
    else {
        await checkCourseExistence(req.session.selectedCourse)
            .then((exists) => {
            if (exists) {
                next();
            }
            else {
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
function logSession(req, res, next) {
    console.log("Session:", req.session.selectedCourse);
    console.log("dirname:", __dirname);
    next();
}
export function configureApp(app) {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, "../public")));
    app.use(session({
        secret: "pin_hunters",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
    }));
    app.use(connectLiveReload());
    app.use(logSession);
    app.use("/map", checkSession);
}
//# sourceMappingURL=express.middleware.js.map