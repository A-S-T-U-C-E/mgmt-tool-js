// @material-ui/icons
import Description from '@material-ui/icons/Description'
import CloudQueue from '@material-ui/icons/CloudQueue'
import DeviceHub from '@material-ui/icons/DeviceHub'
import Backup from '@material-ui/icons/Backup'
import List from '@material-ui/icons/List'
import Fingerprint from '@material-ui/icons/Fingerprint'
import SdCard from '@material-ui/icons/SdCard'
import EventNote from '@material-ui/icons/EventNote'
import Store from '@material-ui/icons/Store'
import StorageIcon from '@material-ui/icons/Storage'
import CloudOff from '@material-ui/icons/CloudOff'
import Security from '@material-ui/icons/Security'
// core components/views
import RelayPage from '../containers/relay/Relay'
import GatekeeperPage from '../containers/gatekeeper/Gatekeeper'
import OrchestratorStatus from '../containers/orchestrator/Status/OrchestratorStatus'
import OrchestratorStore from '../containers/orchestrator/Store/OrchestratorStore'
import ServiceRegistryPage from '../containers/service_registry/ServiceRegistry'
import DashboardPage from '../components/Dashboard/Dashboard'
import IntraCloudPage from '../containers/auth/Intracloud/IntraCloud'
import InterCloudPage from '../containers/auth/Intercloud/InterCloud'

const dashboardRoutes = [
  {
    path: '/registry',
    sidebarName: 'Service Registry',
    navbarName: 'Service Registry',
    icon: Description,
    component: ServiceRegistryPage
  },
  {
    collapse: true,
    path: '/orchestrator',
    sidebarName: 'Orchestration',
    navbarName: 'Orchestration',
    icon: DeviceHub,
    state: 'orchestration',
    views: [
      {
        path: '/orchestrator/status',
        navbarName: 'Status',
        sidebarName: 'Status',
        icon: StorageIcon,
        component: OrchestratorStatus
      },
      {
        path: '/orchestrator/store',
        sidebarName: 'Store',
        navbarName: 'Store',
        icon: Store,
        component: OrchestratorStore
      }
    ]
  },
  {
    collapse: true,
    path: '/authorization',
    sidebarName: 'Authorization',
    navbarName: 'Authorization',
    icon: Fingerprint,
    state: 'authorization',
    views: [
      {
        path: '/authorization/intracloud',
        sidebarName: 'Intracloud',
        navbarName: 'Intracloud',
        icon: CloudOff,
        component: IntraCloudPage
      },
      {
        path: '/authorization/intercloud',
        sidebarName: 'Intercloud',
        navbarName: 'Intercloud',
        icon: CloudQueue,
        component: InterCloudPage
      }
    ]
  },
  {
    path: '/gatekeeper',
    sidebarName: 'Gatekeeper',
    navbarName: 'Gatekeeper',
    icon: Security,
    component: GatekeeperPage
  },
  {
    path: '/relay',
    sidebarName: 'Relay',
    navbarName: 'Relay',
    icon: Backup,
    component: RelayPage
  },
  {
    path: '/eventhandler',
    sidebarName: 'Event Handler',
    navbarName: 'Event Handler',
    icon: EventNote,
    component: DashboardPage
  },
  {
    redirect: true,
    path: '/',
    to: '/registry',
    navbarName: 'Redirect'
  }
]

export default dashboardRoutes
