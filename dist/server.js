import { jsx as _jsx } from "jsxte/jsx-runtime";
import express from 'express';
import path from 'path';
import { expressExtend, renderToHtml } from 'jsxte';
import { CourseList } from './components/CourseList';
import { MapPage } from './components/Map';
import { db } from './database/client';
import { course, hole } from './database/schema/schema';
import { eq, sum } from 'drizzle-orm';
import liveReload from 'livereload';
import 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { configureApp } from './middleware/express.middleware';
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3000;
const app = express();
configureApp(app);
expressExtend(app);
const liveReloadServer = liveReload.createServer();
liveReloadServer.watch(path.join(__dirname));
liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
        liveReloadServer.refresh('/');
    }, 0);
});
// app.get("/", async (req: Request, res: Response) => {
//   try {
//     const coursesData = await db.select().from(course);
//     console.log("Courses:", coursesData);
//     const courseNames = coursesData.map((course) => course.name);
//     console.log("Courses:", courseNames);
//     const html = renderToHtml(<CourseList courseNames={courseNames} />);
//     res.send(html);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// });
app.get('/', async (req, res) => {
    try {
        const coursesData = await db
            .select({
            name: course.name,
            totalPar: sum(hole.par).as('totalPar'),
        })
            .from(course)
            .leftJoin(hole, eq(hole.courseId, course.id))
            .groupBy(course.id)
            .execute();
        console.log('Courses with pars:', coursesData);
        const html = renderToHtml(_jsx(CourseList, { courses: coursesData }));
        res.send(html);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});
app.get('/end-session', (req, res) => {
    req.session.selectedCourse = undefined;
    req.session.save((err) => {
        if (err) {
            console.error('Session save error:', err);
            res.status(500).send('Server error');
        }
        else {
            res.redirect('/');
        }
    });
});
app.get('/get-selected-course', (req, res) => {
    if (req.session.selectedCourse) {
        res.json(req.session.selectedCourse);
    }
});
app.post('/select-course', async (req, res) => {
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
                    console.error('Session save error:', err);
                    res.status(500).send('Server error');
                }
                else {
                    res.redirect('/map');
                }
            });
        }
        else {
            res.status(404).send('Course not found');
        }
    }
    catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Server error');
    }
});
app.get('/course/:name', async (req, res) => {
    try {
        const courseName = req.params.name;
        const selectedCourse = await db
            .select()
            .from(course)
            .where(eq(course.name, courseName));
        if (selectedCourse.length > 0) {
            console.log(selectedCourse[0], 'selectedCourse');
            const holes = await db
                .select()
                .from(hole)
                .where(eq(hole.courseId, selectedCourse[0].id));
            const courseWithHoles = {
                ...selectedCourse[0],
                holes: holes,
            };
            console.log(courseWithHoles, 'courseWithHoles');
            res.json(courseWithHoles);
        }
        else {
            res.status(404).send('Course not found');
        }
    }
    catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Server error');
    }
});
app.get('/map', (req, res) => {
    try {
        if (req.session.selectedCourse) {
            const html = renderToHtml(_jsx(MapPage, {}));
            res.send(html);
        }
        else {
            res.redirect('/');
        }
    }
    catch (error) {
        console.error('Error occurred when trying to render /map:', error);
        res.status(500).send('Server error');
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map