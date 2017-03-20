// @flow

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as NotificationActionCreators from '../actions/notification-action-creators';

export default function withNotificationActions(ComposedComponent: any) {
  return connect(
    null,
    dispatch => bindActionCreators(NotificationActionCreators, dispatch)
  )(ComposedComponent);
}
