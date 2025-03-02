class MyURLSearchParams {
    /**
     * @params {string} init
     */
    constructor(init) {
      this.params = init
      this.tempParams = ''
      this.hashmap =  new Map()
      this.parseParams()
    }

     
    parseParams() {
        const params = this.params.slice(1).split('&')
        for(let i of params) {
            const [key, value] = i.split('=');
            this.append(key,`${value}`)
        }
    }
    /** 
     * @params {string} name
     * @params {any} value
     */
    append(name, value) {
        if(this.hashmap.has(name)) {
            const previous_values = this.hashmap.get(name)
            this.hashmap.set(name,[...previous_values,`${value}`])
        }
        else {
            this.hashmap.set(name, [value])
        }
        this.tempParams += `&${name}=${value}`
        return this.tempParams
    }
    
    /**
     * @params {string} name
     */
    delete(name) {
      
    }
    
    /**
     * @returns {Iterator} 
     */
    entries() {
      
    }
    
    /**
     * @param {(value, key) => void} callback
     */
    forEach(callback) {
      
    }
    
    /**
     * @param {string} name
     * returns the first value of the name
     */
    get(name) {
      if(this.hashmap.has(name)) {
        return this.hashmap.get(name)[0]
      }
      return null
    }
    
    /**
     * @param {string} name
     * @return {string[]}
     * returns the value list of the name
     */
    getAll(name) {
        if(this.hashmap.has(name)) {
            return this.hashmap.get(name)
          }
          return []
    }
    
    /**
     * @params {string} name
     * @return {boolean}
     */
    has(name) {
      return this.hashmap.has(name)
    }
    
    /**
     * @return {Iterator}
     */
    keys() {
      return this.hashmap.keys()
    }
    
    /**
     * @param {string} name
     * @param {any} value
     */
    set(name, value) {
      if(this.hashmap.has(name)) {
        const prev_values = this.hashmap.get(name).slice(1) || []
        this.hashmap.set(name,[`${value}`,...prev_values])
        let get_index = this.tempParams.indexOf(name)+2
        let arr = this.tempParams.split('')
        if(get_index !== -1) {
          arr[get_index] = `${value}`
          this.tempParams =  arr.join('')
          return this.tempParams
        }
      }
      else{
        return "false"
      }
    }
    
    // sor all key/value pairs based on the keys
    sort() {
      this.hashmap = new Map([...this.hashmap.entries()].sort((a,b) => a[0] - b[0]))
      return this.hashmap
    }
    
    /**
     * @return {string}
     */
    toString() {
    
      return this.tempParams.split('').slice(1).join('')
    }
    
    /**
     * @return {Iterator} values
     */
    values() {
        let arr_values =  this.hashmap.values()
        function flaten_array(arr) {
          let res= []
          for(let i of arr) {
            if(Array.isArray(i)) {
              const child = flaten_array(i)
              res.push(...child)
            }
            else{
              res.push(i)
            }
          }
          return res
        }

        return flaten_array(arr_values)
    }
  }

const params = new MyURLSearchParams('?a=1&a=2&b=2')
params.get('a') // '1'
params.getAll('a') // ['1', '2']
params.get('b') // '2'
params.getAll('b') // ['2']
params.append('a', 3)
params.set('b', '3')
params.toString() // 'a=1&a=2&b=3&a=3'