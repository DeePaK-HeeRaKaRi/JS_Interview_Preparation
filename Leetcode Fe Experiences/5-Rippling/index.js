const getFlattenArrayResults = (obj) => {
  let finalArr = [];
  for (let key in obj) {
    let value = obj[key];
    if (typeof value == "object") {
      if (Array.isArray(value)) {
        finalArr = [...finalArr, ...value];
      } else {
        const getNestedRes = getFlattenArrayResults(value);
        finalArr = [...finalArr, ...getNestedRes];
      }
    }
  }
  // console.log({finalArr})
  return finalArr;
};

const FlattenArray = (arr) => {
  let obj = {};
  arr.forEach((val, ind) => {
    if (Array.isArray(val)) {
      const arrLen = val.length;
      const flatChild = FlattenArray(val);
      if (!obj[arrLen]) { 
        obj[arrLen] = { 0: flatChild };  //if the Nested Array with same length ex {3 : {0 :{},1:{}}}
      } else {
        let keysLen = Object.keys(obj[arrLen]).length;  // Here increase the keys Length
        obj[arrLen][keysLen] = flatChild;  // {2: {0:[10,20,30],1:[100,200,300,400]}}
        // console.log('=========,',obj[arrLen])  //
      }
    } else {
      if (!obj[0]) {  
        obj[0] = [val];
      } else {
        obj[0].push(val);
      }
    }
  });
  // console.log({obj},JSON.stringify(obj))
  // const getFinalArray = getFlattenArrayResults(obj);
  return obj;
};

/*
{
    "0": [
        1,
        2,
        6
    ],
    "1": {
        "0": {
            "0": [
                7
            ]
        }
    },
    "2": {
        "0": {
            "0": [
                10
            ],
            "2": {
                "0": {
                    "0": [
                        20,
                        30
                    ]
                }
            }
        },
        "1": {
            "0": [
                100
            ],
            "3": {
                "0": {
                    "0": [
                        200,
                        300,
                        400
                    ]
                }
            }
        }
    },
    "3": {
        "0": {
            "0": [
                3,
                5
            ],
            "1": {
                "0": {
                    "0": [
                        4
                    ]
                }
            }
        }
    }
}

*/
let arr = [
  1,
  2,
  [3, [4, 10, [90, 100], [900, 999]], 5],
  [100, 200, 300],
  6,
  [7],
  [10],
];  //[1, 2, 6, 7, 10, 3, 5, 4, 10, 90, 100, 900, 999, 100, 200, 300]
 arr = [[10,[20,30]],1, 2,0,[100,[200,300,400]], [3, [4], 5], 6, [7]];
 arr = [1,2,3,[[7,8,9]]]
 let getFaltenObj_size = FlattenArray(arr)
 console.log({getFaltenObj_size},JSON.stringify(getFaltenObj_size))
const res = getFlattenArrayResults(getFaltenObj_size);
console.log("Final Array", res);
 
 