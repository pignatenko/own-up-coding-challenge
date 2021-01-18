jest.mock('../../adapters/rate_quote_api_adapter');

import faker from "faker";
import {PROPERTY_TYPE, OCCUPANCY} from '../../enums';
import { setLoanSize, setCreditScore, setPropertyType, setOccupancy, setRateQuotes, setRateQuoteErrors, getRateQuotes } from './actions';
import { getRateQuote } from '../../adapters/rate_quote_api_adapter';
import { RateQuoteItemFactory, RateQuoteFactory } from '../../factories/api/getRatesResponseFactory';
import { Response }  from "node-fetch";


describe('RateQuote Actions', () => {
  describe('#setLoanSize', () => {
    let loanSize;
    beforeEach(() => {
      loanSize = faker.random.number();
    });

    it('should create an action with type rateQuotes/setLoanSize', () => {
      const action = setLoanSize(loanSize);
      expect(action.type).toBe('rateQuotes/setLoanSize');
    });

    it('should create an action and set the payload.loanSize to be the given loan size', () => {
      const action = setLoanSize(loanSize);
      expect(action.payload.loanSize).toBe(loanSize);
    });
  });
  describe('#setCreditScore', () => {
    let creditScore;
    beforeEach(() => {
      creditScore = faker.random.number({min:0, max:850});
    });

    it('should create an action with type rateQuotes/setCreditScore', () => {
      const action = setCreditScore(creditScore);
      expect(action.type).toBe('rateQuotes/setCreditScore');
    });

    it('should create an action and set the payload.creditScore to be the given credit score', () => {
      const action = setCreditScore(creditScore);
      expect(action.payload.creditScore).toBe(creditScore);
    });
  });
  describe('#setPropertyType', () => {
    let propertyType;
    beforeEach(() => {
      propertyType = faker.random.arrayElement(PROPERTY_TYPE);
    });

    it('should create an action with type rateQuotes/setPropertyType', () => {
      const action = setPropertyType(propertyType);
      expect(action.type).toBe('rateQuotes/setPropertyType');
    });

    it('should create an action and set the payload.propertyType to be the given propertyType', () => {
      const action = setPropertyType(propertyType);
      expect(action.payload.propertyType).toBe(propertyType);
    });
  });
  describe('#setOccupancy', () => {
    let occupancy;
    beforeEach(() => {
      occupancy = faker.random.arrayElement(OCCUPANCY);
    });

    it('should create an action with type rateQuotes/setOccupancy', () => {
      const action = setOccupancy(occupancy);
      expect(action.type).toBe('rateQuotes/setOccupancy');
    });

    it('should create an action and set the payload.occupancy to be the given occupancy', () => {
      const action = setOccupancy(occupancy);
      expect(action.payload.occupancy).toBe(occupancy);
    });
  });
  describe('#setRateQuotes', () => {
    let rateQuotes;
    beforeEach(() => {
      rateQuotes = faker.random.arrayElement(OCCUPANCY);
    });

    it('should create an action with type rateQuotes/setOccupancy', () => {
      const action = setRateQuotes(rateQuotes);
      expect(action.type).toBe('rateQuotes/setRateQuotes');
    });

    it('should create an action and set the payload.rateQuotes to be the given rate quotes', () => {
      const action = setRateQuotes(rateQuotes);
      expect(action.payload.rateQuotes).toBe(rateQuotes);
    });
  });

  describe('#setRateQuotes', () => {
    let rateQuotes;
    beforeEach(() => {
      rateQuotes = faker.random.arrayElement(OCCUPANCY);
    });

    it('should create an action with type rateQuotes/setOccupancy', () => {
      const action = setRateQuotes(rateQuotes);
      expect(action.type).toBe('rateQuotes/setRateQuotes');
    });

    it('should create an action and set the payload.loanSize to be the given loan size', () => {
      const action = setRateQuotes(rateQuotes);
      expect(action.payload.rateQuotes).toBe(rateQuotes);
    });
  });

  describe('#setRateQuoteErrors', () => {
    let rateQuoteErrors;
    beforeEach(() => {
      rateQuoteErrors = ['Fake Error Message'];
    });

    it('should create an action with type rateQuotes/setRateQuoteErrors', () => {
      const action = setRateQuoteErrors(rateQuoteErrors);
      expect(action.type).toBe('rateQuotes/setRateQuoteErrors');
    });

    it('should create an action and set the payload.errors to be the given errors', () => {
      const action = setRateQuoteErrors(rateQuoteErrors);
      expect(action.payload.rateQuoteErrors).toBe(rateQuoteErrors);
    });
  });

  describe('#getRateQuotes', () => {
    let loanSize;
    let creditScore;
    let propertyType;
    let occupancy;

    beforeEach(() => {
      loanSize = faker.random.number();
      creditScore = faker.random.number({min:0, max:850});
      propertyType = faker.random.arrayElement(PROPERTY_TYPE);
      occupancy = faker.random.arrayElement(OCCUPANCY);
    });

    it('acts like a thunk and returns a function', () => {
      const action = getRateQuotes(loanSize, creditScore, propertyType, occupancy);
      expect(typeof action).toBe('function');
    });

    describe('when the middleware calls the inner function', () => {
      let rateQuotes;
      let response;
      let dispatch;
      beforeEach(() => {
        dispatch = jest.fn();
      });

      describe('and the call is valid', () => {
        beforeEach(() => {
          rateQuotes = [RateQuoteItemFactory()];
          response = new Response(JSON.stringify(RateQuoteFactory({rateQuotes})));
          getRateQuote.mockRestore();
          getRateQuote.mockReturnValue(response);
        });

        it('it calls the adapter to get rates', async () => {
          await getRateQuotes(loanSize, creditScore, propertyType, occupancy)(dispatch);
          expect(getRateQuote.mock.calls.length).toBe(1);
        });

        it('it dispatches a setRateQuotes action', async () => {
          await getRateQuotes(loanSize, creditScore, propertyType, occupancy)(dispatch);
          expect(dispatch).toHaveBeenCalledWith(setRateQuotes(rateQuotes));
        });
      });

      describe('and the server returns errors', () => {
        let errors;
        beforeEach(() => {
          errors = ['Error'];
          const errorBody = {
            errors,
          };
          response = new Response(JSON.stringify(errorBody), {status: 400});
          getRateQuote.mockRestore();
          getRateQuote.mockReturnValue(response);
        });

        it('it calls the adapter to get rates', async () => {
          await getRateQuotes(loanSize, creditScore, propertyType, occupancy)(dispatch);
          expect(getRateQuote.mock.calls.length).toBe(1);
        });

        it('it dispatches a setRateQuotesError action', async() => {
          await getRateQuotes(loanSize, creditScore, propertyType, occupancy)(dispatch);
          expect(dispatch).toHaveBeenCalledWith(setRateQuoteErrors(errors));
        });
      });

      describe('and the call promise fails', () => {
        let errors;
        beforeEach(() => {
          const error = new Error('My Cool Message');
          errors = [ error.message ];
          getRateQuote.mockRestore();
          getRateQuote.mockReturnValue(Promise.reject(error));
        });

        it('it dispatches a setRateQuotesError action with the Error.message', async() => {
          await getRateQuotes(loanSize, creditScore, propertyType, occupancy)(dispatch);
          expect(dispatch).toHaveBeenCalledWith(setRateQuoteErrors(errors));
        });
      });
    })
  });
});
