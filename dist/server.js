import { jsx as _jsx } from "jsxte/jsx-runtime";
import express from "express";
import path from "path";
import { promises as fs } from "fs";
import session from "express-session";
import { expressExtend, renderToHtml } from "jsxte";
import { CourseList } from "./components/CourseList";
import { MapPage } from "./components/Map";
import { db } from "./database/client";
import { course } from "./database/schema/schema";
import "dotenv/config";
const port = process.env.PORT || 3000;
const app = express();
expressExtend(app);
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log("Database URL:", process.env.DATABASE_URL);
    if (req.method === "GET") {
        console.log("Static file request:", req.path);
    }
    const fetchCourses = async () => {
        try {
            const courses = await db.select().from(course);
            console.log("Courses retrieved:", courses);
        }
        catch (error) {
            console.error("Error retrieving courses:", error);
        }
    };
    // Call the async function to fetch and log courses
    fetchCourses();
    // Proceed to the next middleware function
    next();
});
app.use(express.static(path.join(__dirname, "/public")));
app.use(session({
    secret: "pin_hunters",
    resave: false,
    saveUninitialized: true,
}));
async function checkCourseExistence(courseName) {
    const coursesData = await fs.readFile("courses.json", "utf8");
    const courses = JSON.parse(coursesData);
    return courses.some((course) => course.name === courseName);
}
async function checkSession(req, res, next) {
    console.log("session start", req.session.selectedCourse, "session");
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
app.use("/map", checkSession);
app.use((req, res, next) => {
    console.log(req.method, req.url);
    console.log("Session ID:", req.session.selectedCourse);
    next();
});
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
        console.log("session start", req.session.selectedCourse, "session");
        res.json(req.session.selectedCourse);
    }
});
app.post("/select-course", async (req, res) => {
    const selectedCourseName = req.body.courseName;
    const courses = JSON.parse(await fs.readFile("courses.json", "utf8"));
    const selectedCourse = courses.find((course) => course.name === selectedCourseName);
    if (selectedCourse) {
        req.session.selectedCourse = selectedCourse.name;
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
});
app.get("/course/:name", async (req, res) => {
    try {
        const courses = JSON.parse(await fs.readFile("courses.json", "utf8"));
        const courseName = req.params.name;
        const course = courses.find((c) => c.name === courseName);
        if (course) {
            res.json(course);
        }
        else {
            res.status(404).send("Course not found");
        }
    }
    catch (error) {
        res.status(500).send("Server error");
    }
});
app.get("/map", (req, res) => {
    try {
        if (req.session.selectedCourse) {
            console.log("Rendering MapPage with selected course:", req.session.selectedCourse);
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
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map