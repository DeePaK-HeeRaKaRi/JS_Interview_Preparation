// https://leetcode.com/discuss/post/6386598/goldman-sachs-associate-by-anonymous_use-yfbz/

function getClassAverage(students) {
    if (students.length === 0) return 0;
  
    let totalMarks = 0;
    let count = 0;
  
    for (const student of students) {
      // Each student object has one key-value pair
      const marks = Object.values(student)[0];
      totalMarks += marks;
      count++;
    }
  
    return totalMarks / count;
  }
  console.log(getClassAverage([{ stud1: 10 }, { stud2: 20 }])); // 15
  console.log(getClassAverage([{ alice: 30 }, { bob: 50 }, { carol: 70 }])); // 50
  console.log(getClassAverage([])); // 0
  console.log(getClassAverage([{ a: 0 }, { b: 0 }, { c: 0 }])); // 0
  console.log(getClassAverage([{ x: 100 }])); // 100
    