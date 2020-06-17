import { connect } from 'react-redux';
import { setFavouritePlace, removeFavouritePlace } from '../Actions/placesActions';
import Places from '../Components/Places';


const mapStateToProps = (state) => ({
    favouritePlaces: state.PlacesReducer
  })
  
const mapDispatchToProps = (dispatch) => ({
    addFavouritePlace: (id) => dispatch(setFavouritePlace(id)),
    removeFavouritePlace: (id) => dispatch(removeFavouritePlace(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Places)