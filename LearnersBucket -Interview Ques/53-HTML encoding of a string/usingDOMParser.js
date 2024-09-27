 
function parse(string, markups) {
  // place the opening and closing tags at the appropriate indexes
  const fragments = markups.reduce(
    (chars, [start, end, tag]) => {
      chars[start] = `<${tag}>` + chars[start];
      chars[end] += ``;
      return chars;
    },
    [...string]
  );
  console.log(fragments)
  // pass this string to DOMParser()
  // to convert it to HTML
  return new DOMParser().parseFromString(fragments.join(""), "text/html").body
    .innerHTML;
}

const encoded = parse("Hello, World", [
  [0, 2, "i"],
   
]);


console.log(encoded);

// const encoded = parse("Hello, world", [
//   [0, 2, "i"],
//   [1, 3, "b"],
// ]);

// console.log(encoded);
