import faker from "faker";
import {PROPERTY_TYPE, OCCUPANCY} from '../../enums';
import { setLoanSize, setCreditScore } from './actions';

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

    it('should create an action and set the payload.loanSize to be the given loan size', () => {
      const action = setCreditScore(creditScore);
      expect(action.payload.creditScore).toBe(creditScore);
    });
  });
});
