import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch } from 'react-router-dom'

import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import withStyles from '@material-ui/core/styles/withStyles'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'

import dashboardRoutes from '../../routes/dashboardRoutes'

import dashboardStyle from '../../assets/jss/material-dashboard-react/layouts/dashboardStyle'

import image from '../../assets/img/sidebar-ah-2.png'
import logo from '../../assets/img/arrowhead_logo.png'

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect) {
        return <Redirect from={prop.path} to={prop.to} key={key} />
      }
      return <Route path={prop.path} component={prop.component} key={key} />
    })}
  </Switch>
)

class Dashboard extends Component {
  state = {
    mobileOpen: false
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel)
    }
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false })
      }
    }
  }

  render() {
    const { classes, ...rest } = this.props
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={'Arrowhead'}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color='blue'
          {...rest}
        />
        <div className={classes.mainPanel} ref='mainPanel'>
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          <div className={classes.map}>{switchRoutes}</div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(dashboardStyle)(Dashboard)