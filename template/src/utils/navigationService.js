// navigation possibility without the navigation prop(from the official documentation
// https://reactnavigation.org/docs/navigating-without-navigation-prop/ )
import { createNavigationContainerRef, StackActions, CommonActions } from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

const navigate = (routeName, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(routeName, params);
  }
};

const replace = (routeName, params) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      StackActions.replace(routeName, params)
    );
  }
};

const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
};

const getRoute = () => {
  return navigationRef.isReady() && navigationRef.getCurrentRoute();
};

const reset = (routes, index) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({ index, routes, })
    );
  }
};

export default {
  navigate,
  goBack,
  navigationRef,
  getRoute,
  replace,
  reset,
};
