/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Cargo from "layouts/cargo";
import Truckowner from "layouts/truckowner";
import Matching from "layouts/matching";
// import Notifications from "layouts/notifications";
import System from "layouts/system";
import Statistics from "layouts/statistics";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "차주관리",
    key: "차주관리",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Truckowner",
    component: <Truckowner />,
  },
  {
    type: "collapse",
    name: "화물관리",
    key: "Cargo",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Cargo",
    component: <Cargo />,
  },
  {
    type: "collapse",
    name: "매칭관리",
    key: "Matching",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Matching",
    component: <Matching />,
  },

  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  {
    type: "collapse",
    name: "시스템관리",
    key: "system",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/system",
    component: <System />,
  },
  {
    type: "collapse",
    name: "통계",
    key: "Statistics",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Statistics",
    component: <Statistics />,
  },
  {
    type: "collapse",
    name: "로그인",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "회원가입",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
