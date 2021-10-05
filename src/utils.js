//https://stackoverflow.com/questions/32888728/correct-way-to-share-functions-between-components-in-react

export const doSomethingWithInput = (theInput) => {
  //Do something with the input
  return theInput;
};

export const justAlert = () => {
  alert('hello');
};

export const setMessage = (props, message) => {
  props.setAllValues(preValues => {
    return {...preValues, ['message']: message}
  })
}

export const addHistory = (props, items) => {
  props.setAllValues(preValues => {
    return {...preValues, ['history']: preValues.history.concat(items)}
  })
}


export const clearHistory = (props) => {
  props.setAllValues(preValues => {
    return {...preValues, ['history']: ['App started ...']}
  })
}