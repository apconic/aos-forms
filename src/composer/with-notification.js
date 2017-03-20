// @flow

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as NotificationActionCreators from '../actions/notification-action-creators';

export default function withNotification(ComposedComponent: any) {
  return connect(
    state => ({ notification: state.notifications }),
    dispatch => bindActionCreators(NotificationActionCreators, dispatch)
  )(ComposedComponent);
}
