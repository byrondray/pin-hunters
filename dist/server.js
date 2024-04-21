import { jsx as _jsx } from "jsxte/jsx-runtime";
import express from "express";
import path from "path";
import session from "express-session";
import { expressExtend, renderToHtml } from "jsxte";
import { CourseList } from "./components/CourseList";
import { MapPage } from "./components/Map";
import { db } from "./database/client";
import { course } from "./database/schema/schema";
import { checkSession } from "./middleware/express.middleware";
import { eq } from "drizzle-orm";
import "dotenv/config";
const port = process.env.PORT || 3000;
const app = express();
expressExtend(app);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(session({
    secret: "pin_hunters",
    resave: false,
    saveUninitialized: true,
}));
app.use("/map", checkSession);
app.get("/", async (req, res) => {
    try {
        const coursesData = await db.select().from(course);
        console.log("Courses:", coursesData);
        const courseNames = coursesData.map((course) => course.name);
        console.log("Courses:", courseNames);
        const html = renderToHtml(_jsx(CourseList, { courseNames: courseNames }));
        res.send(html);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
app.get("/end-session", (req, res) => {
    req.session.selectedCourse = undefined;
    req.session.save((err) => {
        if (err) {
            console.error("Session save error:", err);
            res.status(500).send("Server error");
        }
        else {
            res.redirect("/");
        }
    });
});
app.get("/get-selected-course", (req, res) => {
    if (req.session.selectedCourse) {
        res.json(req.session.selectedCourse);
    }
});
app.post("/select-course", async (req, res) => {
    const selectedCourseName = req.body.courseName;
    try {
        const selectedCourse = await db
            .select()
            .from(course)
            .where(eq(course.name, selectedCourseName));
        if (selectedCourse.length > 0) {
            req.session.selectedCourse = selectedCourse[0].name;
            req.session.save((err) => {
                if (err) {
                    console.error("Session save error:", err);
                    res.status(500).send("Server error");
                }
                else {
                    res.redirect("/map");
                }
            });
        }
        else {
            res.status(404).send("Course not found");
        }
    }
    catch (error) {
        console.error("Database query error:", error);
        res.status(500).send("Server error");
    }
});
app.get("/course/:name", async (req, res) => {
    try {
        const courseName = req.params.name;
        const selectedCourse = await db
            .select()
            .from(course)
            .where(eq(course.name, courseName));
        if (selectedCourse) {
            res.json(selectedCourse);
        }
        else {
            res.status(404).send("Course not found");
        }
    }
    catch (error) {
        console.error("Database query error:", error);
        res.status(500).send("Server error");
    }
});
app.get("/map", (req, res) => {
    try {
        if (req.session.selectedCourse) {
            const html = renderToHtml(_jsx(MapPage, {}));
            res.send(html);
        }
        else {
            res.redirect("/");
        }
    }
    catch (error) {
        console.error("Error occurred when trying to render /map:", error);
        res.status(500).send("Server error");
    }
});
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map