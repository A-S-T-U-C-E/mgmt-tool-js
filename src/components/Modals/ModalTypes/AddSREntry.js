import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import Fab from '@material-ui/core/Fab'
import Button from '../../CustomButtons/Button'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Card from '@material-ui/core/Card'
import ChipInput from 'material-ui-chip-input'
import AutoComplete from '../../AutoComplete/AutoComplete'
import { getSystems } from '../../../actions/system'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  input: {
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '10px',
    marginBottom: '10px',
    width: '400px'
  },
  prop: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  propKey: {
    width: '30%',
    marginLeft: '20px',
    marginRight: theme.spacing.unit * 2,
    marginBottom: '10px'
  },
  propValue: {
    width: '30%',
    marginRight: '20px',
    marginBottom: '10px'
  },
  fabStyle: {
    marginLeft: '20px'
  },
  wrapper: {
    position: 'relative',
    padding: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 8
  }
})

class AddSREntry extends Component {
  constructor(props) {
    super(props)

    this.state = {
      autoFillSystemId: null,
      systemName: '',
      address: '',
      port: '',
      authenticationInfo: '',
      serviceMetadata: [{ name: '', value: '' }]

    }
  }

  componentDidMount() {
    this.props.getSystems()
  }

  handleSystemSearchOnChange = value => {
    if (value !== undefined) {
      this.setState({
        systemName: value
        //  autoFillSystemId
      })
    }
  }

  handleSystemNameOnChange = event => {
    this.setState({ systemName: event.target.value })
  }

  handleAddressOnChange = event => {
    this.setState({ address: event.target.value })
  }

  handlePortOnChange = event => {
    if (event.target.value === '' || (event.target.value > 0 && event.target.value <= 65536)) {
      this.setState({ port: event.target.value })
    }
  }

  handleAuthenticationInfoOnChange = event => {
    this.setState({ authenticationInfo: event.target.value })
  }

  handleServiceDefinitionOnChange = event => {
    this.setState({ serviceDefinition: event.target.value })
  }

  addServiceMetadataPropertyAdd = () => {
    this.setState({ serviceMetadata: [...this.state.serviceMetadata, { name: '', value: '' }] })
  }

  handleServiceMetadataChange = (index, key) => event => {
    const metadataArray = this.state.serviceMetadata
    metadataArray[index][key] = event.target.value
    this.setState({ serviceMetadata: metadataArray })
  }

  removeServiceMetadataProperty = (removeIndex) => () => {
    this.setState({ serviceMetadata: [...this.state.serviceMetadata.slice(0, removeIndex), ...this.state.serviceMetadata.slice(removeIndex + 1)] })
  }

  render() {
    const { classes, system } = this.props
    return (
      <div>
        <Card raised style={{ display: 'flex', flexDirection: 'column', margin: '10px', width: '440px' }}>
          <Typography variant='headline' align='center' style={{ paddingTop: '10px' }}>System Details</Typography>
          <AutoComplete
            suggestions={[]/* system */}
            placeholder='System Name'
            id='system_search'
            handleOnChange={this.handleSystemSearchOnChange}
            classes={{
              inputRoot: { flexWrap: 'wrap' },
              textField: { width: '400px', marginTop: '20px', marginLeft: '20px', marginRight: '20px' }
            }} />
          <TextField
            className={classes.input}
            id='address'
            label='Address'
            onChange={this.handleAddressOnChange}
          />
          <TextField
            className={classes.input}
            id='port'
            label='Port'
            onChange={this.handlePortOnChange}
            value={this.state.port}
            type='number'
            inputProps={{
              min: '1',
              max: '65535'
            }}
          />
          <TextField
            className={classes.input}
            id='authenticationInfo'
            label='Authentication Info'
            onChange={this.handleAuthenticationInfoOnChange} />
        </Card>
        <Card raised style={{ display: 'flex', flexDirection: 'column', margin: '10px', width: '440px' }}>
          <Typography variant='headline' align='center' style={{ paddingTop: '10px' }}>Service Details</Typography>
          <TextField
            id='serviceDefinition'
            className={classes.input}
            label='Service Definition'
            onChange={this.handleServiceDefinitionOnChange} />
          <ChipInput
            id='interface'
            className={classes.input}
            label='Interface'
            onChange={this.handleInterfaceChipsOnChange} />
          <Typography variant='subtitle2' style={{ margin: '20px' }}>Service Metadata</Typography>
          <div>
            {this.state.serviceMetadata.map(({ name, value }, index) => (
              <div key={index} className={classes.prop}>
                <TextField
                  label='Name'
                  value={name}
                  className={classes.propKey}
                  onChange={this.handleServiceMetadataChange(index, 'name', value)}
                />
                <TextField
                  label='Value'
                  value={value}
                  className={classes.propValue}
                  onChange={this.handleServiceMetadataChange(index, 'value', value)}
                />
                <IconButton
                  color='secondary'
                  aria-label='Remove Property'
                  onClick={this.removeServiceMetadataProperty(index)}><ClearIcon /></IconButton>
              </div>
            ))}
          </div>
          <Fab
            className={classes.fabStyle}
            size='small' color='secondary'
            aria-label='Add'
            onClick={this.addServiceMetadataPropertyAdd}><AddIcon /></Fab>
          <TextField id='serviceURI' className={classes.input} label='Service URI' />
          <TextField id='udp' className={classes.input} label='UDP' />
          <TextField id='endOfValidity' className={classes.input} label='End of Validity' />
          <TextField id='version' className={classes.input} label='Version' />
        </Card>
        <Button
          disabled={this.state.systemName === '' || this.state.address === '' || this.state.port === ''}
          color='primary'
          onClick={this.handleAddSystemButtonClick}
          style={{
            width: '440px',
            marginLeft: '10px'
          }}><AddIcon />Add</Button>
      </div>
    )
  }
}

AddSREntry.propTypes = {
  classes: PropTypes.object.isRequired,
  getSystems: PropTypes.func.isRequired,
  system: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { system } = state
  return { system }
}

function mapDispatchToProps(dispatch) {
  return {
    getSystems: () => {
      dispatch(getSystems())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddSREntry))
