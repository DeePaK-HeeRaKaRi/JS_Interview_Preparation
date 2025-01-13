export const checklistData = {
  label: "Root",
  value: null,
  children: [
    {
      label: "Child 1 of Root",
      value: null,
      children: [
        {
          label: "Nested Child 1-1",
          value: true,
          children: [
            {
              label: "Nested Child 1-1-1",
              value: true,
              children: [
                {
                  label: "Deeply Nested Child 1-1-1-1",
                  value: true,
                },
                {
                  label: "Deeply Nested Child 1-1-1-2",
                  value: true,
                },
              ],
            },
            {
              label: "Nested Child 1-1-2",
              value: false,
            },
          ],
        },
        {
          label: "Nested Child 1-2",
          value: true,
        },
      ],
    },
    {
      label: "Child 2 of Root",
      value: true,
      children: [
        {
          label: "Nested Child 2-1-1",
          value: false,
        },
      ],
    },
    {
      label: "Child 3 of Root",
      value: false,
    },
    {
      label: "Child 4 of Root",
      value: false,
    },
  ],
};


