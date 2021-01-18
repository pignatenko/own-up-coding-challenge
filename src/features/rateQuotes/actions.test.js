import faker from "faker";
import {PROPERTY_TYPE, OCCUPANCY} from '../../enums';
import { setLoanSize } from './actions';

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
});
