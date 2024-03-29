export const tableColumns = [
  {
    label: "Название",
    prop: "title",
    sortable: true,
    dataView: "title",
    width: 150,
  },
  {
    label: "Время",
    prop: "time",
    sortable: true,
    icon: "timer",
    dataView: "time",
    width: 100,
  },
  {
    label: "Места",
    prop: "count",
    sortable: true,
    dataView: "count",
    width: 100,
  },
  {
    label: "Дни недели",
    prop: "weekdays",
    sortable: false,
    dataView: "weekdays",
    width: 150,
    widget: {
      type: "Tags",
      effect: "dark",
      colors: ["success", "info", "warning"],
    },
  },
  {
    label: "Тренер",
    prop: "coach",
    sortable: true,
    dataView: "coach",
    childView: "name",
    width: 150,
  },
  {
    label: "Тип",
    prop: "type",
    sortable: true,
    dataView: "type",
    childView: "title",
    width: 100,
  },
  {
    label: "Зал",
    prop: "room",
    sortable: true,
    dataView: "room",
    childView: "name",
    width: 100,
  },
];
export const filterColumns = [
  {
    title: "Тип",
    key: "groups",
    widget: {
      type: "Select",
      view: "title",
      value: "id",
      multi: true,
      placeholder: "Тип тренировки",
      endpoint: { tableName: "groupTypes" },
    },
    prop: "type",
  },
  {
    key: "groups",
    title: "Название группы",
    widget: {
      type: "Input",
      view: "title",
      placeholder: "Название группы",
    },
    prop: "title",
  },
];



const a = [1,2,'Basya',4,5]



a[3]