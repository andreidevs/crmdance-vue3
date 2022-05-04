
import { defineStore } from 'pinia';
import { getTable } from '../apis';


export const useRoomStore = defineStore('room',
  {
    state() {
      return {
        activeRoom: null,
        listRoom: []
      };
    },

    actions: {
      async getRoomList() {
        this.listRoom = (await getTable({ tableName: "room" })).data
        // console.log("listRoom", this.listRoom)
      }
    }
  })