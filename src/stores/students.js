import { defineStore } from "pinia";
import { addData, getById, getTable } from "../apis";

const N = "students";

export const useStudentsStore = defineStore("studentsStore", {
  id: "students",
  state: () => ({
    groupsList: [],
    last: {},
    first: {},
    page: 1,
  }),

  actions: {
    async createStudent(data) {
      const create = await addData({ tableName: N, data });

      return create;
    },

    async getStudents() {
      return await getTable({
        tableName: N,
        select: "*, coach(*), type(*), room(*)",
        pagination: true,
        page: this.page,
      });
    },

    async getLessonsTypes() {
      return await getTable({
        tableName: "lessonTypes",
      });
    },

    async getStudentById(id) {
      return await getById({ tableNAme: N, id });
    },
  },
});
