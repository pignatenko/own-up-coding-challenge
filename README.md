Submission Statement:

My goal was to create an easily maintainable and fully testable application for
getting loan rates. The following architectural decisions were made:

- The application was created with the create-react-app bootstrap for speed. It
    more or less follows all the template standard behavior (see
    README.default.md).

- The RateQuote component was put into a feature in order to namespace this
    set of functionality to make it easier to maintain in the future as the
    application grows.

- Valid enumerators for API calls were placed inside an `enums` module in order
    to make sure that we were not using magic strings.

- The API calls were seperated from the Action Creator thunks instead of inlining them in the
    thunks by creating an API adapter in order to provide loose coupling testability
    and extensibility. While this project currently is fairly simple and can use
    isometric data if calling APIs that are less than stellar/ have different
    formatting / bad naming etc / 3rd party this pattern provides a way for us
    to not pollute our code base with design decisions we may not agree with.

- Action creators were seperated from reducers in order to seperate the "generation" of
    data and the "integration" of data into the state. Action creators take the
    most specific arguments and output namespaced types and action payloads that are
    fragments of the whole feature namespace.  This allows them to be easily constructed,
    reduced, generified and tested. Actions were used to demonstrate MVP testing
    methodologies as well as rule of 3 refactoring (despite the code being
    simple and very obviously easy to table test).

- Reducers were created in the same pattern as actions in order to make writing
    and testing straight forward and easy to test. Reducers were tested by using
    table tests.

- THe UI was built with Material UI toolkit this allowed rapid development and
    is ultimately themable to make the look and feel be brand unique.

- The UI was split into 2 components, the control component which took user
    input and modified the state, and the list component which displayed the
    result of the API calls.

- The control component uses a couple of UI/UX nice to haves such as masking using
    react-number-format, highlighted invalid inputs with error messages (credit score),
    select all on click of input fields, and debounced input.

- The control component uses controlled components which make sure that the
    control always reflects the application state to the user.

- The control component was tested using a number of methodologies, the obvious
    was snapshot tests which are very common render based tests. However also
    included were tests to make sure that the control in a valid state can
    render all the required data fields which with a snapshot isn't as usful but
    the point is that in in a more complex application setting up edge cases
    requries this testing methodology. Included are also interactive tests
    making sure that components on user interaction changes generate the right
    actions, that each input is interactive, and that the edge case of invalid credit
    score works correctly.

- While the control component includes a button to call the API (as per the
    mockup) the event layer is constructed in a way where it would be fairly
    simple to remove the button for a fully reactive experience.

- The list component was very simply tested by using snapshot tests of the 2 use cases.


Package explinations:
 - Babel was used in order to compile the JSX and make the testing environment
     work smoothly.
    - "@babel/preset-env": "^7.12.11",
    - "@babel/runtime": "^7.12.5",
    - "@babel/core": "^7.12.10",
    - "@babel/plugin-transform-runtime": "^7.12.10",
    - "babel-jest": "^26.6.3",

- Material UI was chosen for it's UI capabilities to speed up development while
    some Lab utilities were used and there is a discussion of appropriateness in
    production code this was an easier shortcut than manually creating similar
    UI experiences
    - "@material-ui/core": "^4.11.2",
    - "@material-ui/data-grid": "^4.0.0-alpha.17",
    - "@material-ui/lab": "^4.0.0-alpha.57",

- Redux toolkit was used for some of it's helper functions
    "@reduxjs/toolkit": "^1.5.0",

- Enzyme and subsequent related components were used in order to make testing
    DOM easier
    - "@wojtekmaj/enzyme-adapter-react-17": "^0.4.1",
    - "enzyme": "^3.11.0",
    - "enzyme-to-json": "^3.6.1",

- Lodash was used as a quick way to debounce UI events in order to make the
    action smoother when the user types.
    - "lodash": "^4.17.20",

- React number format / react text mask were used in order to create a mask and aid user experience
    - "react-number-format": "^4.4.4",
    - "react-text-mask": "^5.4.3",

- Redux mock store was used in order to allow for easier state testing
    "redux-mock-store": "^1.5.4",

- Redux thunk was used in order to adhere to the common and easily maintainable thunk pattern rather
  than doing something like callbacks or timeouts that would generate actions.
    "redux-thunk": "^2.3.0",

- Faker was used in order to create factories with realistic data to test on
    "faker": "^5.1.0",

- Fetch mock jest and node-fetch were used in order to demonstrate unit tests for the adapter layer.
    "fetch-mock-jest": "^1.5.1",
    "node-fetch": "^2.6.1"

How to run / test:

Run the tests without modifying `src/config.js` repository. I did not have time to add
header sanitization into the call mocks. 

`npm run test` - to run jest 


To explore all functionality first run the API without modifying `src/config.js`
as it will show you the error handling as a result of the 403.

Afterward insert an API Token into `src/config.js` -- realistically this should
come from a secrets manager that is provisioned with cloud integration as a 3rd
party application. After inserting the API token, if running with `npm start` the
hot reload should kick in and pressing the button again will allow for a
successful API call and clearing the error.

`npm start` - to start
