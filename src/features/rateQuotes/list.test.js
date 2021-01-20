import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMount } from  '@material-ui/core/test-utils';
import { RateQuoteList } from './list';
import {renderToJson} from 'enzyme-to-json';
import rateQuotesFixture from '../../fixtures/rateQuotesFixture.json';

const MockStore = configureStore([]);

describe("<RateQuoteList />", () => {
  let initialState;
  let component;
  let store
  let mount;

  beforeAll(()=> {
    mount = createMount();
  });

  describe("when there are errors", () => {
    beforeEach(() => {
      initialState = {
        rateQuoteErrors: ['first error', 'second error', 'third error'],
        rateQuotes: [],
      };
      store = MockStore({rateQuotes: initialState});
      component = mount(<Provider store={store}> <RateQuoteList/> </Provider>);
    });

    it('matches the snapshot', () => {
      expect(renderToJson(component.render())).toMatchSnapshot(); 
    });
  });

  describe('when there are rate quotes to show', () => {
    beforeEach(() => {
      initialState = {
        rateQuoteErrors: [],
        rateQuotes: rateQuotesFixture
      };
      store = MockStore({rateQuotes: initialState});
      component = mount(<Provider store={store}> <RateQuoteList/> </Provider>);
    });

    it('matches the snapshot', () => {
      expect(renderToJson(component.render())).toMatchSnapshot(); 
    });
  });
});
