const fi = (function () {
  return {
    libraryMethod: function () {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function (collection, callback) {
      if (Array.isArray(collection)) {
        for (const element of collection) {
          callback(element, collection.indexOf(element), collection)
        }
      } else if (typeof collection === 'object') {
        for (const [key, value] of Object.entries(collection)) {
          callback(key, value, collection);
        }
      }
      return collection
    },

    map: function (collection, callback) {
      let newCollection = []
      if (Array.isArray(collection)) {
        for (const element of collection) {
          const newElement = callback(element, collection.indexOf(element), collection)
          newCollection.push(newElement)
        }
      } else if (typeof collection === 'object') {
        for (const [key, value] of Object.entries(collection)) {
          const newElement = callback(value, key, collection);
          newCollection.push(newElement)
        }
      }
      return newCollection
    },

    reduce: function (collection, callback, acc) {
      let newAcc = !!acc? acc : collection[0];
      let i = !!acc? 0 : 1;

      for (; i < collection.length; i++) {
        newAcc = callback(newAcc, collection[i], collection)
      }

      return newAcc;
    },
    find: function(collection, predicate) {
      for(let i = 0; i < collection.length; i++) {
        if(predicate(collection[i])) {
          return collection[i];
        }
      }

      return undefined
    },
    filter: function(collection, predicate) {
      let elementsFound = [];

      for(let i = 0; i < collection.length; i++) {
        if(predicate(collection[i])) {
          elementsFound.push(collection[i]);
        }
      }
      return elementsFound;
    },
    size: function(collection) {
      if (Array.isArray(collection)) {
        return collection.length;
      } else if (typeof collection === 'object') {
        return Object.entries(collection).length
      }
    },
    first: function(array, n = 1) {
      return n == 1? array.slice(0, n)[0]: array.slice(0, n);
    },
    last: function(array, n = 1) {
      const result = array.slice(array.length - n);
      return n == 1? result[0]: result;
    },
    compact: function(array) {
      return this.filter(array, elem => !!elem)
    },
    sortBy: function(array, callback) {
      let resutlObj = {}
      for(const elem of array) {
        resutlObj[callback(elem)] = elem
      }

      let sortedKeys = Object.keys(resutlObj).sort();

      let sortedResult = [];
      for(const elem  of sortedKeys) {
        sortedResult.push(resutlObj[elem])
      }

      return sortedResult;
    },
    functions: function () {

    },


  }
})()

fi.libraryMethod()
