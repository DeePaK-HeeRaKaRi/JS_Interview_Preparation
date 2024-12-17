function renderToDOM(virtualNode, domNode) {
  if (!virtualNode) return; // Handle null or undefined nodes
  
  if (Array.isArray(virtualNode)) {
    for (let node of virtualNode) {
      renderToDOM(node, domNode); // Handle arrays of nodes
    }
    return;
  }
  
  const { type, props } = virtualNode;
  
  const element = document.createElement(type); // Create the DOM element
  
  if (props) {
    for (let key in props) {
      if (key === "children") {
        const children = props[key];
        if (typeof children === "object") {
          for (let childKey in children) {
            renderToDOM(children[childKey], element); // Append children to current element
          }
        } else {
          element.textContent = children; // Set text if children is a string/number
        }
      } else {
        element.setAttribute(key, props[key]); // Set other attributes like id, class, etc.
      }
    }
  }
  
  domNode.appendChild(element); // Append the created element to the parent node
}


// [{type:'div',child:'depak'},{type:'h1',children:'h1 tag'}]
// [{
  // 0: "This is",
  // 1: {
  //   type: "h1",
  //   props: {
  //     key: "10",
  //     id: "heading",
  //     children: "devtools.tech",
  //   },
  // }]

// const virtualNode = {
//   type: "div",
//   props: {
//     class: "heading-container",
//     children: {
//       0: "This is",
//       1: {
//         type: "h1",
//         props: {
//           key: "10",
//           id: "heading",
//           children: "devtools.tech",
//         },
//       },
//       2: {
//         type: "h2",
//         props: {
//           id: "heading",
//           children: "is Awesome!!",
//         },
//       },
//       3: {
//         type: "input",
//         props: {
//           type: "text",
//           value: "Devtools Tech",
//         },
//       },
//       4: {
//         type: "button",
//         props: {
//           children: "Click",
//         },
//       },
//       5: 0,
//       6: {
//         props: {
//           children: {
//             0: {
//               type: "div",
//               props: {
//                 children: "React",
//               },
//             },
//             1: {
//               type: "div",
//               props: {
//                 children: "Fragment",
//               },
//             },
//           },
//         },
//       },
//       7: "",
//     },
//   },
// };

const virtualNode = {
  type: "div",
  props: {
    class: "main-container",
    children: {
      0: {
        type: "h1",
        props: {
          id: "main-heading",
          children: "Welcome to Devtools Tech",
        },
      },
      1: {
        type: "p",
        props: {
          children: "Explore our amazing features:",
        },
      },
      2: {
        type: "ul",
        props: {
          children: {
            0: {
              type: "li",
              props: { children: "Feature 1: Performance" },
            },
            1: {
              type: "li",
              props: { children: "Feature 2: Flexibility" },
            },
            2: {
              type: "li",
              props: { children: "Feature 3: Scalability" },
            },
          },
        },
      },
      3: {
        type: "form",
        props: {
          children: {
            0: {
              type: "label",
              props: {
                for: "username",
                children: "Username:",
              },
            },
            1: {
              type: "input",
              props: {
                type: "text",
                id: "username",
                name: "username",
                placeholder: "Enter your username",
              },
            },
            2: {
              type: "label",
              props: {
                for: "password",
                children: "Password:",
              },
            },
            3: {
              type: "input",
              props: {
                type: "password",
                id: "password",
                name: "password",
                placeholder: "Enter your password",
              },
            },
            4: {
              type: "button",
              props: {
                type: "submit",
                children: "Login",
              },
            },
          },
        },
      },
    },
  },
};
const domNode = document.getElementById("root");
renderToDOM(virtualNode, domNode);
// domNode.appendChild = renderToDOM(virtualNode, domNode);
