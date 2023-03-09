import { StageTypes } from "../types/Stage.type";

export const genres = [
  {
    name: "Historical",
    color: "#FF8019",
  },
  {
    name: "Horror",
    color: "#F00314",
  },
  {
    name: "Detective",
    color: "#FAE603",
  },
  {
    name: "Romance",
    color: "#3BB5FF",
  },
  {
    name: "Adventure",
    color: "#28E10A",
  },
  {
    name: "Dystopian",
    color: "#0500C7",
  },
  {
    name: "Science fiction",
    color: "#5C03FA",
  },
  {
    name: "Fantasy",
    color: "#DE00ED",
  },
];

export const emptyStages = [
  {
    id: 0,
    title: "On the shelf",
    status: StageTypes.Ready,
    items: [],
  },
  {
    id: 1,
    title: "Reading",
    status: StageTypes.InProgress,
    items: [],
  },
  {
    id: 2,
    title: "Read",
    status: StageTypes.Done,
    items: [],
  },
];

export const demoStages = [
  {
    id: 0,
    title: "On the shelf",
    status: 0,
    items: [
      {
        id: 1678365059835,
        title: "The Secrets of Hartwood Hall",
        author: "Katie Lumsden",
        genre: [
          { name: "Historical", color: "#FF8019" },
          { name: "Romance", color: "#3BB5FF" },
        ],
        size: "127800",
        rating: 0,
        review: "",
      },
      {
        id: 1678365527398,
        title: "The Martian",
        author: "Andy Weir",
        genre: [{ name: "Science fiction", color: "#5C03FA" }],
        size: "104588",
        rating: 0,
        review: "",
      },
    ],
  },
  {
    id: 1,
    title: "Reading",
    status: 1,
    items: [
      {
        id: 1678365373665,
        title: "Hobbit",
        author: "J.R.R. Tolkien",
        genre: [
          { name: "Adventure", color: "#28E10A" },
          { name: "Fantasy", color: "#DE00ED" },
        ],
        size: "95356",
        rating: 0,
        review: "",
      },
      {
        id: 1678365472190,
        title: "Shadow and Bone",
        author: "Leigh Bardugo",
        genre: [{ name: "Fantasy", color: "#DE00ED" }],
        size: "81215",
        rating: 0,
        review: "",
      },
      {
        id: 1678365443677,
        title: "Hunger Games",
        author: "Susanne Collins",
        genre: [{ name: "Dystopian", color: "#0500C7" }],
        size: "99750",
        rating: 0,
        review: "",
      },
    ],
  },
  {
    id: 2,
    title: "Read",
    status: 2,
    items: [
      {
        id: 1678365307307,
        title: "Pride and Prejudice",
        author: "Jane Austin",
        genre: [
          { name: "Romance", color: "#3BB5FF" },
          { name: "Historical", color: "#FF8019" },
        ],
        size: "156644",
        rating: 0,
        review: "",
      },
      {
        id: 1678365157027,
        title: "Dracula",
        author: "Bram Stoker",
        genre: [{ name: "Horror", color: "#F00314" }],
        size: "92000",
        rating: 0,
        review: "",
      },
      {
        id: 1678365221953,
        title: "The ABC Murders",
        author: "Agatha Christie",
        genre: [{ name: "Detective", color: "#FAE603" }],
        size: "57139",
        rating: 0,
        review: "",
      },
    ],
  },
];
