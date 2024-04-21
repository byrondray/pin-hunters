export class CourseSessionManager {
    sessionData = null;
    courseData = null;
    getSessionData() {
        return this.sessionData;
    }
    setSessionData(data) {
        this.sessionData = data;
    }
    getCourseData() {
        return this.courseData;
    }
    setCourseData(data) {
        this.courseData = data;
    }
    async endSession() {
        try {
            await fetch("/end-session");
            this.sessionData = null;
            this.courseData = null;
        }
        catch (error) {
            console.error("An error occurred while ending the session", error);
        }
    }
    async fetchSessionData() {
        try {
            const response = await fetch("/get-selected-course");
            if (response.ok) {
                const sessionData = await response.json();
                return sessionData;
            }
            else {
                console.error("Session not found");
                return null;
            }
        }
        catch (error) {
            console.error("An error occurred while retrieving the session", error);
            return null;
        }
    }
    async fetchCourseData() {
        try {
            if (!this.sessionData) {
                const fetchedSessionData = await this.fetchSessionData();
                this.setSessionData(fetchedSessionData);
            }
            const sessionData = this.getSessionData();
            if (!sessionData) {
                console.error("No course selected in the session");
                return;
            }
            const response = await fetch(`/course/${encodeURIComponent(sessionData)}`);
            if (response.ok) {
                const courseData = await response.json();
                this.setCourseData(courseData);
                return courseData;
            }
            else {
                throw new Error("Could not retrieve holes data for the selected course");
            }
        }
        catch (error) {
            console.error("An error occurred while retrieving course data:", error);
        }
    }
}
//# sourceMappingURL=api.js.map