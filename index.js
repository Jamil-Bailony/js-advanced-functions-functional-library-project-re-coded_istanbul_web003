const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, iteratee) {
      const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection)

      for (let idx = 0; idx < newCollection.length; idx++)
        iteratee(newCollection[idx])

      return collection
    },

    map: function(collection, iteratee) {
      if (!(collection instanceof Array))
        collection = Object.values(collection)

      const newArr = []

      for (let idx = 0; idx < collection.length; idx++)
        newArr.push(iteratee(collection[idx]))

      return newArr
    },


		reduce: function(c = [], callback = () => {}, acc) {
			let collection = c.slice(0)

			if (!acc) {
				acc = collection[0]
				collection = collection.slice(1)
			}

			let len = collection.length;

			for (let i = 0; i < len; i++) {
				acc = callback(acc, collection[i], collection)
			}
			return acc;
		},

    find: function(collection, predicate) {
      if (!(collection instanceof Array))
        collection = Object.values(collection)

      for (let idx = 0; idx < collection.length; idx++)
        if (predicate(collection[idx])) return collection[idx]

      return undefined
    },

    filter: function(collection, predicate) {
      if (!(collection instanceof Array))
        collection = Object.values(collection)

      const newArr = []

      for (let idx = 0; idx < collection.length; idx++)
        if (predicate(collection[idx])) newArr.push(collection[idx])

      return newArr
    },

    size: function(collection) {
      return (collection instanceof Array) ? collection.length : Object.keys(collection).length
    },

    first: function(collection, stop=false) {
      return (stop) ? collection.slice(0, stop) : collection[0]
    },

    last: function(collection, start=false) {
      return (start) ? collection.slice(collection.length-start, collection.length) : collection[collection.length-1]
    },

    compact: function(collection) {
      const badBad = new Set([false, null, 0, "", undefined, NaN])
      return collection.filter(el => !badBad.has(el))
    },

    sortBy: function(collection, callback) {
      const newArr = [...collection]
      return newArr.sort(function(a, b) {
        return callback(a) - callback(b)
      })
    },

    unpack: function(receiver, arr) {
      for (let val of arr)
        receiver.push(val)
    },

    flatten: function(collection, shallow, newArr=[]) {
      if (!Array.isArray(collection)) return newArr.push(collection)
      if (shallow) {
        for (let val of collection)
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        for (let val of collection) {
          this.flatten(val, false, newArr)
        }
      }
      return newArr
    },

    uniqSorted: function(collection, iteratee) {
      const sorted = [collection[0]]
      for (let idx = 1; idx < collection.length; idx++) {
        if (sorted[idx-1] !== collection[idx])
          sorted.push(collection[idx])
      }
      return sorted
    },

    uniq: function(collection, sorted=false, iteratee=false) {
      if (sorted) {
        return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = iteratee(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },

    keys: function(obj) {
      // Using for loop
      const keys = []
      for (let key in obj){
        keys.push(key)
      }
      return keys
    },

    values: function(obj) {
      // Using for loop
      const values = []
      for (let key in obj){
        values.push(obj[key])
      }
      return values

      // Using the custom 'map' method from above
      // return this.map(obj, (value) => value)

    },

    functions: function(obj) {
      const functionNames = []

      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }

      return functionNames.sort()
    },

  }
})()

fi.libraryMethod()

// const fi = (function () {
//   return {
//     libraryMethod: function () {
//       return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
//     },

//     each: function (collection, callback) {
//       if (Array.isArray(collection)) {
//         for (const element of collection) {
//           callback(element, collection.indexOf(element), collection)
//         }
//       } else if (typeof collection === 'object') {
//         for (const [key, value] of Object.entries(collection)) {
//           callback(key, value, collection);
//         }
//       }
//       return collection
//     },

//     map: function (collection, callback) {
//       let newCollection = []
//       if (Array.isArray(collection)) {
//         for (const element of collection) {
//           const newElement = callback(element, collection.indexOf(element), collection)
//           newCollection.push(newElement)
//         }
//       } else if (typeof collection === 'object') {
//         for (const [key, value] of Object.entries(collection)) {
//           const newElement = callback(value, key, collection);
//           newCollection.push(newElement)
//         }
//       }
//       return newCollection
//     },

//     reduce: function (collection, callback, acc) {
//       let newAcc = !!acc? acc : collection[0];
//       let i = !!acc? 0 : 1;

//       for (; i < collection.length; i++) {
//         newAcc = callback(newAcc, collection[i], collection)
//       }

//       return newAcc;
//     },
//     find: function(collection, predicate) {
//       for(let i = 0; i < collection.length; i++) {
//         if(predicate(collection[i])) {
//           return collection[i];
//         }
//       }

//       return undefined
//     },
//     filter: function(collection, predicate) {
//       let elementsFound = [];

//       for(let i = 0; i < collection.length; i++) {
//         if(predicate(collection[i])) {
//           elementsFound.push(collection[i]);
//         }
//       }
//       return elementsFound;
//     },
//     size: function(collection) {
//       if (Array.isArray(collection)) {
//         return collection.length;
//       } else if (typeof collection === 'object') {
//         return Object.entries(collection).length
//       }
//     },
//     first: function(array, n = 1) {
//       return n == 1? array.slice(0, n)[0]: array.slice(0, n);
//     },
//     last: function(array, n = 1) {
//       const result = array.slice(array.length - n);
//       return n == 1? result[0]: result;
//     },
//     compact: function(array) {
//       return this.filter(array, elem => !!elem)
//     },
//     sortBy: function(array, callback) {
//       let resutlObj = {}
//       for(const elem of array) {
//         resutlObj[callback(elem)] = elem
//       }

//       let sortedKeys = Object.keys(resutlObj).sort();

//       let sortedResult = [];
//       for(const elem  of sortedKeys) {
//         sortedResult.push(resutlObj[elem])
//       }

//       return sortedResult;
//     },
//     functions: function () {

//     },


//   }
// })()

// fi.libraryMethod()
