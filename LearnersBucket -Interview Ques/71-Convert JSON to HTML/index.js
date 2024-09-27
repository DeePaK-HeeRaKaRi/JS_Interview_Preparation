// const JSONtoHTML=(json)=>{
//     let fragment = document.createDocumentFragment()
//     if(Array.isArray(json)){
//         for(let entry of json){
//             let element = document.createElement(entry.type)

//             if(entry.props){
//                 for (let key in entry.props) {
//                     element.setAttribute(key, entry.props[key]);
//                 }
//                 console.log(element);
//             }

//                 if(Array.isArray(entry.children)){
//                     for(let child of entry.children){
//                         console.log(child)
//                         element.appendChild(JSONtoHTML(child))
//                     }
//                 }else{
//                     element.innerText = entry.children
//                 }

//             fragment.appendChild(element)
//         }
//     }
//     else{
//         return JSONtoHTML([json])
//     }
//     // console.log('-----fragment',fragment.children)
//     return fragment
// }

const JSONtoHTML = (json) => {
  // create a fragment
  const fragment = document.createDocumentFragment();
  if (Array.isArray(json)) {
    // convert each entry of array to DOM element
    for (let entry of json) {
      // create the element
      const element = document.createElement(entry.type);
      // if props available
      // set them
      if (entry.props) {
        for (let key in entry.props) {
          element.setAttribute(key, entry.props[key]);
        }
      }
      // if array of children
      if (Array.isArray(entry.children)) {
        // recursively convert the children to DOM
        // and assign them
        for (let child of entry.children) {
          element.appendChild(JSONtoHTML(child));
        }
      }
      // if children is string / text
      else {
        element.innerText = entry.children;
      }
      // add the element back to the fragment
      fragment.appendChild(element);
    }
  }
  // if not array recursively call the same function
  // pass the entry as an array.
  else {
    return JSONtoHTML([json]);
  }
  return fragment;
};
const json = [
  {
    type: "div",
    props: { id: "hello", class: "foo" },
    children: [
      { type: "h1", children: "HELLO" },
      {
        type: "p",
        children: [
          { type: "span", props: { class: "bar" }, children: "World" },
        ],
      },
    ],
  },
  {
    type: "section",
    props: { id: "hello-2", class: "foo-2" },
    children: [
      { type: "h1", children: "HELLO-2" },
      {
        type: "p",
        children: [
          { type: "span", props: { class: "bar-2" }, children: "World" },
        ],
      },
    ],
  },
];
let wrapper = document.createElement("div");
let container=document.querySelector('.container')
 
let res = JSONtoHTML(json);
console.log(res)
container.appendChild(res);
for (let i = 0; i < res.children.length; i++) {
  console.log("---------", res.children[i]);
}
