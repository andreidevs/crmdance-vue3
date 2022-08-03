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
    async createGroup(data) {
      return await addData({ tableName: N, data });
    },

    async getStudents() {
      return await getTable({
        tableName: N,
        select: "*, coach(*), type(*), room(*)",
        key: N,
        pagination: true,
        page: this.page,
      });
    },

    async getStudentById(id) {
      return await getById({ tableNAme: N, id });
    },
  },
});
