const users = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_WORKERS':
      return [
        ...state,
        {
          workers : action.list
        }
      ]

    default:
      return state
  }
}

const user = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_WORKER':
      return [
        ...state,
        {
          currentWorker : action.worker
        }
      ]

    default:
      return state
  }
}

const location = (state = [], action) => {
  switch (action.type) {
    case 'UPADTE_LOCATION':
      return [
        ...state,
        {
          accessPoint : action.accesPoint
        }
      ]

    default:
      return state
  }
}

export {users, location}
