import {CardStyleInterpolators} from '@react-navigation/stack';

import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';

const routes = [
  {
    name: 'Home',
    component: HomePage,
    options: {},
  },
  {
    name: 'Detail',
    component: DetailPage,
    options: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
  },
];

export default routes;
