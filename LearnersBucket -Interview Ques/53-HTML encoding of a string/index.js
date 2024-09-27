// helper function works as Priority queue
// to add tags and sort them in descending order
// based on the difference between the start and end
function addAndSort(track, index, data) {
  if (!track[index]) track[index] = [];
  track[index] = [...track[index], data];
  track[index].sort((a, b) => a.getRange() > b.getRange());
  // console.log("track-----------", track);
}

function Stack() {
  let items = [];
  let top = 0;

  //Push an item in the Stack
  this.push = function (element) {
    items[top++] = element;
  };

  //Pop an item from the Stack
  this.pop = function () {
    return items[--top];
  };

  //Peek top item from the Stack
  this.peek = function () {
    return items[top - 1];
  };

  this.final = function () {
    return items;
  };
}

// helper function to form a tag
// and trace the string
function Tag(start, end, tag) {
  this.start = start;
  this.end = end;
  this.tag = tag;
  this.text = "";
  this.getRange = () => {
    return this.end - this.start;
  };
}

function parse(str, markups) {
  // create an empty array for all the indexes of the string
  const track = new Array(str.length).fill(null);
  // add the tag at the starting point
  // of each text mentioned in the markups
  for (let markup of markups) {
    const [start, end, tag] = markup;
    // if (start > end) return "Cannot form a tag";
    addAndSort(track, start, new Tag(start, end, tag));
    // console.log('-------new',track)
  }
  console.log("track-----------", track);
  // create a new stack
  const html = new Stack();
  // initialize with a new Tag that has max range and empty string
  html.push(new Tag(0, Number.MAX_VALUE, ""));
  // iterate each character of the string
  for (let i = 0; i < str.length; i++) {
    // check for opening tags and add them
    while (track[i] && track[i].length > 0) {
      const cur = track[i].shift();
      cur.text = `<${cur.tag}>`;
      if (cur.end > html.peek().end) {
        const split = new Tag(html.peek().end + 1, cur.end, cur.tag);
        cur.end = html.peek().end;
        addAndSort(track, html.peek().end + 1, split);
      }
      // push the new tag
      html.push(cur);
    }
    // add the current character to the currently topmost tag
    html.peek().text += str[i];
    // Check for closing tags and close them.
    while (html.peek().end === i) {
      html.peek().text += `</${html.peek().tag}>`;
      const temp = html.pop().text;
      html.peek().text += temp;
    }
    console.log('--------',html.final());
  }
  // return the topmost
  
  return html.pop().text;
}

const encoded = parse('Hello, World', [
  [0, 2, "i"],
  [7, 10, "u"],
  [4, 9, "b"],
  [7,8,"div"],
  [2, 7, "p"],
  [7, 9, "u"],

]);
// const encoded = parse("Hello, world", [
//   [0, 2, "i"],
//   [1, 3, "b"],
// ]);

console.log(encoded);
