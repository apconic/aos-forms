import NotificationActionTypes from '../actions/notification-action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case NotificationActionTypes.SHOW_NOTIFICATION:
      return action.payload;
    case NotificationActionTypes.CLEAR_NOTIFICATION:
      return {};
    default:
      return state;
  }
};
