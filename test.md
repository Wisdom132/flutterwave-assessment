###### For string
`const body = {
  rule: {
    field: "data.text",
    condition: "contains",
    condition_value: "boy",
  },
  data: {
      text: "Wisdom is a boy"
  }
};`

`
const body = {
  rule: {
    field: "text.2",
    condition: "eq",
    condition_value: "s",
  },
  data: {
      text: "Wisdom"
  },
};
`


###### For Array
`const body = {
  rule: {
    field: "array.2",
    condition: "eq",
    condition_value: "pineapple",
  },
  data: {
    array: ["apple", "orange", "pineapple"],
  },
};`


###### For object
`const body = {
  rule: {
    field: "missions.count",
    condition: "gte",
    condition_value: 30,
  },
  data: {
    name: "James Holden",
    crew: "Rocinante",
    age: 34,
    position: "Captain",
    missions: {
      count: 45,
      successful: 44,
      failed: 1,
    },
  },
};`
