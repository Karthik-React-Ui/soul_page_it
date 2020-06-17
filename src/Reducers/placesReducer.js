const PlacesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_FAVOURITE_PLACE':
        return [
          ...state,
          {
            id: action.id,
          }
        ]
      case 'REMOVE_FAVOURITE_PLACE':
        return state.filter(place =>place.id !== action.id) 
      default:
        return state
    }
  }
  
  export default PlacesReducer;