import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import ModalContainer from '../../components/Modals/ModalContainer/ModalContainer'
import { hideModal, showModal } from '../../actions/modal'
import GatekeeperTabContainer from './GatekeeperTabContainer'
import { getClouds, addCloud, deleteCloud, updateCloud } from '../../actions/gatekeeper'
import { addRelay, deleteRelay, getRelays, updateRelay } from '../../actions/relay'

const styles = theme => ({
  root: {},
  grid: {},
  buttonMargin: {
    marginLeft: '10px',
    marginRight: '10px'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

const handlers = {
  relay: {
    addRelay,
    deleteRelay,
    updateRelay
  },
  neighborhood: {
    addCloud,
    deleteCloud,
    updateCloud
  }
}

class Gatekeeper extends Component {
  componentDidMount() {
    this.props.getClouds()
    this.props.getRelays()
  }

  onAddRelayClick = () => {
    this.props.showModal({
      open: true,
      closeModal: this.closeModal
    }, 'addRelay')
  }

  onAddNeighborhoodClick = () =>{
    this.props.showModal({
      open: true,
      closeModal: this.closeModal
    }, 'addNeighborhood')
  }

  render() {
    const { classes, gatekeeper, relay } = this.props
    return (
      <div className={classes.root}>
        <GatekeeperTabContainer relayData={relay.data} neighborhoodData={gatekeeper.data} handlers={handlers} />
        <ModalContainer />
      </div>
    )
  }
}

Gatekeeper.propTypes = {
  getClouds: PropTypes.func.isRequired,
  addCloud: PropTypes.func.isRequired,
  deleteCloud: PropTypes.func.isRequired,
  updateCloud: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  gatekeeper: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
  getRelays: PropTypes.func.isRequired,
  addRelay: PropTypes.func.isRequired,
  deleteRelay: PropTypes.func.isRequired,
  updateRelay: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { gatekeeper, relay } = state
  return { gatekeeper, relay }
}

function mapDispatchToProps(dispatch) {
  return {
    getClouds: () => {
      dispatch(getClouds())
    },
    addCloud: (newCloud) => {
      dispatch(addCloud(newCloud))
    },
    deleteCloud: (operator, cloudName) => {
      dispatch(deleteCloud(operator, cloudName))
    },
    updateCloud: (updatedCloud) => {
      dispatch(updateCloud(updatedCloud))
    },
    getRelays: () => {
      dispatch(getRelays())
    },
    addRelay: (newRelay) => {
      dispatch(addRelay(newRelay))
    },
    deleteRelay: (id) => {
      dispatch(deleteRelay(id))
    },
    updateRelay: (updatedRelay) => {
      dispatch(updateRelay(updatedRelay))
    },
    hideModal: () => {
      dispatch(hideModal())
    },
    showModal: (modalProps, modalType) => {
      dispatch(showModal({ modalProps, modalType }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Gatekeeper))
