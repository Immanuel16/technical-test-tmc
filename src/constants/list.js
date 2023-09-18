const listTodo = [
  {
    id: 1,
    dueDate: "2023-09-22T16:00:00Z",
    name: "Project Alpha",
    isDone: false,
    userId: "12deacvbe",
    subTodo: [],
  },
  {
    id: 2,
    dueDate: "2023-09-22T16:00:00Z",
    isDone: true,
    name: "Project 8",
    userId: "12deacvbe",
    subTodo: [],
  },
  {
    id: 3,
    dueDate: "2023-09-22T16:00:00Z",
    isDone: false,
    name: "Project 1",
    userId: "12deacvbe",
    subTodo: [
      {
        id: 1,
        dueDate: "2023-09-22T16:00:00Z",
        isDone: false,
        name: "sub Todo 1",
      },
      {
        id: 2,
        dueDate: "2023-09-22T16:00:00Z",
        isDone: false,
        name: "sub Todo 2",
      },
    ],
  },
  {
    id: 4,
    dueDate: "2023-09-13T14:00:00Z",
    isDone: false,
    name: "Project 3",
    userId: "12deacvbe",
    subTodo: [],
  },
  {
    id: 5,
    dueDate: "2023-09-13T14:00:00Z",
    isDone: false,
    name: "Project 4",
    userId: "12deacvbe",
    subTodo: [],
  },
];

export { listTodo };
