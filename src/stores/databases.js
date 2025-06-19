import { defineStore } from "pinia";

export const useDatabasesStore = defineStore("databases", {
  state: () => ({
    //  estado aquí
    currentDatabase: null,
    availableDatabases: [],
  }),
  actions: {
    $reset() {
      this.currentDatabase = null;
      this.availableDatabases = [];
    },
  },
});
