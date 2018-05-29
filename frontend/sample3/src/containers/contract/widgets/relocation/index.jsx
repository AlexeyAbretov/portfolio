import { connect } from 'react-redux';

import RelocationWidget from 'components/widgets/relocation';
import { fetchStreets, fetchHouses, closeRelocationDialog, createRelocationRequest } from 'actions';

const mapStateToProps = state => ({
  isVisible: state.relocation.isVisible,
  addressPopupOptions: {},
  streets: state.relocation.streets,
  houses: state.relocation.houses,
  showError: state.relocation.showError,
  regionId: state.info.regionId,
  regionName: state.info.regionName
});

const mapDispatchToProps = dispatch => ({
  closeRelocationDialog: () => dispatch(closeRelocationDialog()),
  fetchStreets: term => dispatch(fetchStreets(term)),
  fetchHouses: (streetId, term) => dispatch(fetchHouses({ streetId, term })),
  createRelocationRequest: requestData => dispatch(createRelocationRequest(requestData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelocationWidget);
