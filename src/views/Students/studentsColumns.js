export const tableColumns = [
  {
    label: "ФИО",
    prop: "name",
    sortable: true,
    dataView: "name",
    width: 150,
  },
  {
    label: "Телефон",
    prop: "phone",
    sortable: true,
    dataView: "phone",
    width: 120,
  },
  {
    label: "Подписка",
    prop: "subscriptions",
    sortable: true,
    dataView: "subscription",
    filterView: "price_kz",
    width: 120,
  },
  {
    label: "Тип занятия",
    prop: "type",
    sortable: false,
    dataView: "type",
    childView: "title",
    width: 140,
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
    label: "Зал",
    prop: "room",
    sortable: true,
    dataView: "room",
    childView: "name",
    width: 110,
  },
  {
    label: "Оплата",
    prop: "payDate",
    sortable: true,
    dataView: "payDate",
    widget: {
      type: "PayField",
    },
    width: 200,
  },
];

export const filterColumns = [
  // {
  //   title: "Тип",
  //   key: "groups",
  //   widget: {
  //     type: "Select",
  //     options: filterOptions["groupTypes"],
  //     view: "title",
  //     value: "id",
  //     multi: true,
  //     placeholder: "Тип тренировки",
  //     endpoint: { tableName: "groupTypes" },
  //   },
  //   prop: "type",
  // },
];
