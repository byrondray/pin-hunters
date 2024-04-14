import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import path from "path";
import { promises as fs } from "fs";
import session from "express-session";
import { type Course } from "./interfaces/ICourse";
import { expressExtend, renderToHtml } from "jsxte";
import { CourseList } from "./views/CourseList";
import { CLIENT_RENEG_LIMIT } from "tls";

declare module "express-session" {
  interface SessionData {
    selectedCourse: string | undefined;
  }
}

const port = process.env.PORT || 3000;

const app = express();
expressExtend(app);

app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "pin_hunters",
    resave: false,
    saveUninitialized: true,
  })
);

async function checkCourseExistence(courseName: string): Promise<boolean> {
  const coursesData = await fs.readFile("courses.json", "utf8");
  const courses = JSON.parse(coursesData);
  return courses.some((course: Course) => course.name === courseName);
}

async function checkSession(req: Request, res: Response, next: NextFunction) {
  console.log("session start", req.session.selectedCourse, "session");
  if (req.session.selectedCourse === undefined) {
    res.redirect("/courses");
  } else {
    await checkCourseExistence(req.session.selectedCourse)
      .then((exists) => {
        if (exists) {
          next();
        } else {
          req.session.selectedCourse = undefined;
          res.redirect("/courses");
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

app.get("/courses", async (req: Request, res: Response) => {
  try {
    const coursesData = await fs.readFile("courses.json", "utf8");
    const courses = JSON.parse(coursesData);

    const courseNames = courses.map((course: Course) => course.name);

    const html = renderToHtml(<CourseList courseNames={courseNames} />);

    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.get("/end-session", (req: Request, res: Response) => {
  req.session.selectedCourse = undefined;
  req.session.save((err) => {
    if (err) {
      console.error("Session save error:", err);
      res.status(500).send("Server error");
    } else {
      res.redirect("/courses");
    }
  });
});

app.get("/get-selected-course", (req: Request, res: Response) => {
  if (req.session.selectedCourse) {
    console.log("session start", req.session.selectedCourse, "session");
    res.json(req.session.selectedCourse);
  }
});

app.post("/select-course", async (req, res) => {
  const selectedCourseName = req.body.courseName;
  const courses = JSON.parse(await fs.readFile("courses.json", "utf8"));
  const selectedCourse = courses.find(
    (course: Course) => course.name === selectedCourseName
  );
  if (selectedCourse) {
    req.session.selectedCourse = selectedCourse.name;
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        res.status(500).send("Server error");
      } else {
        res.redirect("/map");
      }
    });
  } else {
    res.status(404).send("Course not found");
  }
});

app.get("/course/:name", async (req, res) => {
  try {
    const courses = JSON.parse(await fs.readFile("courses.json", "utf8"));
    const courseName = req.params.name;
    const course = courses.find((c: Course) => c.name === courseName);
    if (course) {
      res.json(course);
    } else {
      res.status(404).send("Course not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.get("/", (req: Request, res: Response) => {
  if (req.session.selectedCourse) {
    res.redirect("/map");
  } else {
    res.redirect("/courses");
  }
});

app.get("/map", (req: Request, res: Response) => {
  if (req.session.selectedCourse) {
    res.sendFile(path.join(__dirname, "dist/index.html"));
  } else {
    res.redirect("/courses");
  }
});

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
