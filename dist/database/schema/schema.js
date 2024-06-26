import { sql } from "drizzle-orm";
import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
export const course = sqliteTable("course", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    createdAt: text("created_at").default(sql `(current_timestamp)`),
    updatedAt: text("updated_at").default(sql `(current_timestamp)`),
});
export const hole = sqliteTable("hole", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    courseId: integer("course_id")
        .references(() => course.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
    })
        .notNull(),
    number: integer("number").notNull(),
    par: integer("par").notNull(),
    lat: real("lat").notNull(),
    lng: real("lng").notNull(),
    createdAt: text("created_at").default(sql `(current_timestamp)`),
    updatedAt: text("updated_at").default(sql `(current_timestamp)`),
});
//# sourceMappingURL=schema.js.map