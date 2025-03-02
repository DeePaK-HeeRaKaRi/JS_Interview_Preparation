
const flattenObject = (data,prefix = '') => {
    let obj = {}
    for(let [key,val] of Object.entries(data)) {
        let newKey = prefix ? `${prefix}_${key}` : key
        if(val && typeof val == 'object') {
            let child = flattenObject(val,newKey)
            // obj = {...obj,...child}
            Object.assign(obj, child) //Directly Merge into the obj
        }
        else {
            obj[newKey] = val
        }
    }
    return obj
}
 
const user = {
  name: "Vishal",
  age: null,
  address: {
    primary: {
      house: "109",
      street: {
        main: "21",
        cross: null,
      },
    },
    secondary: null,
  },
  phones: [
    { type: "home", number: "1234567890" },
    { type: "work", number: null },
  ],
  preferences: null,
};

console.log(flattenObject(user,'user'))
/* output
    {
     user_name: "Vishal",
     user_age: null,
     user_address_primary_house: "109",
     user_address_primary_street_main: "21",
     user_address_primary_street_cross: null,
     user_address_secondary: null,
     user_phones_0_type: "home",
     user_phones_0_number: "1234567890",
     user_phones_1_type: "work",
     user_phones_1_number: null,
     user_preferences: null
    } */
