import React from 'react'
import {
  sortableContainer,
  sortableElement
} from 'react-sortable-hoc'
import arrayMove from 'array-move'
import * as PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import _ from 'lodash'

const SortableItem = sortableElement(({ value }) => (
  <li className="SortableItem">
    <Typography>{value}</Typography>
  </li>
))

const SortableContainer = sortableContainer(({ children }) => {
  return <ul className="SortableList">{children}</ul>
})

class BackupSortableList extends React.Component {
  state = {
    items: []
  }

  componentDidMount() {
    this.setState({ items: this.props.list })
  }

  onSortEnd = async ({ oldIndex, newIndex }) => {
    await this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex)
    }))

    const disabled = _.isEqual(this.state.items, this.props.list)
    this.props.onItemsOrderChanged(
      this.props.serviceId,
      disabled,
      this.state.items
    )
  }

  onItemsOrderChanged = newArray => {
    return _.isEqual(newArray, this.props.list)
  }

  render() {
    const { items } = this.state

    return (
      <SortableContainer onSortEnd={this.onSortEnd}>
        {items.map((provider, index) => (
          <SortableItem
            key={index}
            index={index}
            value={provider.systemName}
            helperClass="SortableHelper"
          />
        ))}
      </SortableContainer>
    )
  }
}

BackupSortableList.propTypes = {
  list: PropTypes.array.isRequired,
  onItemsOrderChanged: PropTypes.func.isRequired,
  serviceId: PropTypes.number.isRequired
}

export default BackupSortableList
