# Apconic base UI based on Material UI

A Higher Order Component using react and redux to keep form state.
This package only supports Material UI (https://github.com/callemall/material-ui).

## Getting Started

* Run npm install lodash react react-dom material-ui redux react-redux aos-forms
* Create a redux store and add forms reducer to it.
~~~~
  import { FormsReducer as Forms } from 'aos-forms';
  import { createStore, combineReducers } from 'redux';

  const reducers = combineReducers({
    Forms,
  });
  const store = createStore(reducers);
  export default store;
~~~~
* Below is an example of form schema and form
~~~~
  import React from 'react';
  import ReactDOM from 'react-dom';
  import injectTapEventPlugin from 'react-tap-event-plugin';
  import { Provider } from 'react-redux';
  import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
  import RaisedButton from 'material-ui/RaisedButton';
  import { DataField, composeWithRedux, DataFieldSchema } from 'aos-forms';
  import '../style/style.css';
  import store from './redux-store';

  // Needed for onTouchTap
  // http://stackoverflow.com/a/34015469/988941
  injectTapEventPlugin();

  const formSchema = {
    firstName: DataFieldSchema.text('firstName').label('First name').default('number 123').regex('number').mandatory(),
    description: DataFieldSchema.text('description').default('number 345').readOnly().label('Description'),
    startDate: DataFieldSchema.date('startDate').label('Start date').mandatory(),
    startTime: DataFieldSchema.time('startTime').label('Start time').mandatory(),
    quantity: DataFieldSchema.number('quantity').label('Quantity').min(120).max(200).mandatory().decimal(2),
    password: DataFieldSchema.text('password').label('Password').mandatory().password(),
    sendNotification: DataFieldSchema.toggle('sendNotification').label('Send Notification'),
    addDetails: DataFieldSchema.check('addDetails').label('Add details in notification'),
    profession: DataFieldSchema.autoComplete('profession').label('Profession').strings([
      "Doctor",
      "Engineer",
      "Plumber",
    ]),
    rooms: DataFieldSchema.
      select('rooms').
      label('Rooms').
      objects([
        { title: 'Barbie', number: '1' },
        { title: 'Jackson', number: '2' },
        { title: 'Presidential', number: '3' },
      ],
      { primaryTextKey: 'title', secondaryTextKey: 'number'}),
  };

  const App = (props) => {
    const {
      firstName,
      description,
      startDate,
      quantity,
      password,
      startTime,
      sendNotification,
      addDetails,
      rooms,
      profession,
      valid
    } = props;
    const successResult =  { result: true };
    return (
      <div>
        <DataField {...firstName} />
        <DataField {...description} />
        <DataField {...startDate} />
        <DataField {...quantity} />
        <DataField {...password} />
        <DataField {...startTime} />
        <DataField {...sendNotification} />
        <DataField {...addDetails} />
        <DataField {...rooms} />
        <DataField {...profession} />
        <RaisedButton label='Save' primary disabled={!valid} />
      </div>
    );
  };

  App.propTypes = {
    firstName: PropTypes.object,
    description: PropTypes.object,
    startDate: PropTypes.object,
    quantity: PropTypes.object,
    password: PropTypes.object,
    startTime: PropTypes.object,
    sendNotification: PropTypes.object,
    addDetails: PropTypes.object,
    rooms: PropTypes.object,
    profession: PropTypes.object,
    valid: PropTypes.bool,       // This will be true only if all the validations have passed.
    formValues: PropTypes.object // This object contains property and there values.
  };

  const ReduxApp = composeWithRedux(App, 'App', formSchema);
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <ReduxApp />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
  );
~~~~

### Prerequisites

You need to create an app with some configuration usually using webpack or meteor.

### Installing

npm install aos-forms

## Running the tests

I have added some tests. More as time permits me.

## Built With

* [MaterialUI](https://github.com/callemall/material-ui) - The web framework used
* [Redux](http://redux.js.org//) - State manager

## Contributing

If you need to contribute to this project please send me a mail.
Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Suhail Ansari** - *Initial work*

See also the list of [contributors](https://github.com/apconic/aos-base-ui/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration: Redux forms and other forms library.
* etc
