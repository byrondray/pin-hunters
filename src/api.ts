type CourseDataType = {
  name: string;
  holes: Hole[];
};

type Hole = {
  par: number;
  lat: number;
  lng: number;
};

export class CourseSessionManager {
  private sessionData: string | null = null;
  private courseData: CourseDataType | null = null;

  public getSessionData() {
    return this.sessionData;
  }

  public setSessionData(data: string) {
    this.sessionData = data;
  }

  public getCourseData() {
    return this.courseData;
  }

  public setCourseData(data: CourseDataType) {
    this.courseData = data;
  }

  public async endSession() {
    try {
      await fetch("/end-session");
      this.sessionData = null;
      this.courseData = null;
    } catch (error) {
      console.error("An error occurred while ending the session", error);
    }
  }

  private async fetchSessionData() {
    try {
      const response = await fetch("/get-selected-course");
      if (response.ok) {
        const sessionData = await response.json();
        return sessionData;
      } else {
        console.error("Session not found");
        return null;
      }
    } catch (error) {
      console.error("An error occurred while retrieving the session", error);
      return null;
    }
  }

  public async fetchCourseData() {
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

      const response = await fetch(
        `/course/${encodeURIComponent(sessionData)}`
      );
      if (response.ok) {
        const courseData = await response.json();
        this.setCourseData(courseData as CourseDataType);
        return courseData;
      } else {
        throw new Error(
          "Could not retrieve holes data for the selected course"
        );
      }
    } catch (error) {
      console.error("An error occurred while retrieving course data:", error);
    }
  }
}
