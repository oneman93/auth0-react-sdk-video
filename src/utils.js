//https://stackoverflow.com/questions/32888728/correct-way-to-share-functions-between-components-in-react

export const doSomethingWithInput = (theInput) => {
  //Do something with the input
  return theInput;
};

export const justAnAlert = () => {
  alert('hello');
};

export const setMessage = (props, message1) => {
  props.setAllValues(preValues => {
    return {...preValues, ['message']: message1}
  })
}

export const setProfile = (props, profile) => {
  props.setAllValues(preValues => {
    return {...preValues, ['profile']: profile}
  })
}

export const setMessageCascade = (props, message2) => {
  props.setAllValues(preValues => {
    return {...preValues, ['messageCascade']: message2}
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

export const toggleShowLog = (props) => {
  props.setAllValues(preValues => {
    return {...preValues, ['showLog']: !props.allValues.showLog}
  })
}
