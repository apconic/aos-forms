// @flow
import NotificationActionTypes from './notification-action-types';
import NotificationTypes from './notification-types';
import cryptoRandomString from 'crypto-random-string';

export function notifySuccess(message: string,
  autoDismiss: number = 5,
  dismissible: boolean = true,
  position: string = 'tr',
  title: string = 'Success'
) {
  const uid = cryptoRandomString(10);
  return {
    type: NotificationActionTypes.SHOW_NOTIFICATION,
    payload: {
      level: NotificationTypes.SUCCESS,
      message,
      autoDismiss,
      dismissible,
      position,
      uid,
      title,
    },
  };
}

export function notifyError(message: string,
  autoDismiss: number = 5,
  dismissible: boolean = true,
  position: string = 'tr',
  title: string = 'Error'
) {
  const uid = cryptoRandomString(10);
  return {
    type: NotificationActionTypes.SHOW_NOTIFICATION,
    payload: {
      level: NotificationTypes.ERROR,
      message,
      autoDismiss,
      dismissible,
      position,
      uid,
      title,
    },
  };
}

export function notifyWarning(message: string,
  autoDismiss: number = 5,
  dismissible: boolean = true,
  position: string = 'tr',
  title: string = 'Warning'
) {
  const uid = cryptoRandomString(10);
  return {
    type: NotificationActionTypes.SHOW_NOTIFICATION,
    payload: {
      level: NotificationTypes.WARNING,
      message,
      autoDismiss,
      dismissible,
      position,
      uid,
      title,
    },
  };
}

export function notifyInfo(message: string,
  autoDismiss: number = 5,
  dismissible: boolean = true,
  position: string = 'tr',
  title: string = 'Information'
) {
  const uid = cryptoRandomString(10);
  return {
    type: NotificationActionTypes.SHOW_NOTIFICATION,
    payload: {
      level: NotificationTypes.INFO,
      message,
      autoDismiss,
      dismissible,
      position,
      uid,
      title,
    },
  };
}

export function clearNotification() {
  return {
    type: NotificationActionTypes.CLEAR_NOTIFICATION,
    payload: {},
  };
}
