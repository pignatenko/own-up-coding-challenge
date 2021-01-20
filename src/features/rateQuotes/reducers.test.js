import { OCCUPANCY, PROPERTY_TYPE } from "../../enums";
import { RateQuoteItemFactory } from "../../factories/api/getRatesResponseFactory";

import {
  reduceSetLoanSize,
  reduceSetCreditScore,
  reduceSetPropertyType,
  reduceSetOccupancy,
  reduceSetRateQuotes,
  reduceSetRateQuoteErrors,
  reduceRateQuotes,
  initialSetLoanSizeState,
  initialSetCreditScoreState,
  initialSetPropertyTypeState,
  initialSetOccupancyState,
  initialSetRateQuotesState,
  initialSetRateQuoteErrorsState,
  initialRateQuotesState,
} from "./reducers";

describe("RateQuote Reducers", () => {
  let action;
  let state;
  const wrongAction = {
    type: "noSuchFeature/noSuchEvent",
    payload: {
      nothing: 123,
    },
  };
  const tests = [
    {
      function: reduceSetLoanSize,
      initial: initialSetLoanSizeState,
      type: "rateQuotes/setLoanSize",
      payload: {
        loanSize: 100000,
      },
    },
    {
      function: reduceSetCreditScore,
      initial: initialSetCreditScoreState,
      type: "rateQuotes/setCreditScore",
      payload: {
        creditScore: 800,
      },
    },
    {
      function: reduceSetOccupancy,
      initial: initialSetOccupancyState,
      type: "rateQuotes/setOccupancy",
      payload: {
        occupancy: OCCUPANCY.Secondary,
      },
    },
    {
      function: reduceSetPropertyType,
      initial: initialSetPropertyTypeState,
      type: "rateQuotes/setPropertyType",
      payload: {
        propertyType: PROPERTY_TYPE.Condo,
      },
    },
    {
      function: reduceSetRateQuotes,
      initial: initialSetRateQuotesState,
      type: "rateQuotes/setRateQuotes",
      payload: {
        rateQuotes: [RateQuoteItemFactory()],
      },
    },
    {
      function: reduceSetRateQuoteErrors,
      initial: initialSetRateQuoteErrorsState,
      type: "rateQuotes/setRateQuoteErrors",
      payload: {
        rateQuoteErrors: ["Something went wrong"],
      },
    },
  ];

  tests.forEach((test) => {
    describe(`#${test.function.name}`, () => {
      beforeEach(() => {
        state = {};
        action = {
          type: test.type,
          payload: test.payload,
        };
      });

      it(`triggers on action.type = ${test.type}`, () => {
        const newState = test.function(state, action);
        expect(newState).not.toBe(state);
        expect(newState).toStrictEqual(action.payload);
      });

      it(`does not trigger when sent any other type`, () => {
        const newState = test.function(state, wrongAction);
        expect(newState).toBe(state);
      });

      it(`sets the default state if undefined`, () => {
        const newState = test.function(undefined, wrongAction);
        expect(newState).toBe(test.initial);
      });
    });
  });

  describe("#reduceSetRateQuotes", () => {
    it("adds an id attribute for Material UI DataGrid requirements", () => {
      const action = {
        type: "rateQuotes/setRateQuotes",
        payload: {
          rateQuotes: [RateQuoteItemFactory(), RateQuoteItemFactory()],
        },
      };

      const newState = reduceSetRateQuotes({}, action);
      expect(newState.rateQuotes.every((r) => r.id)).toBeTruthy();
    });
  });
  describe(`#reduceRateQuotes`, () => {
    it(`does not trigger on unhandled actions`, () => {
      const newState = reduceRateQuotes(initialRateQuotesState, wrongAction);
      expect(newState).toBe(initialRateQuotesState);
    });

    it(`sets the default state if undefined`, () => {
      const newState = reduceRateQuotes(undefined, wrongAction);
      expect(newState).toBe(initialRateQuotesState);
    });

    tests.forEach((test) => {
      beforeEach(() => {
        state = {};
        action = {
          type: test.type,
          payload: test.payload,
        };
      });

      it(`triggers on action.type = ${test.type}`, () => {
        const newState = reduceRateQuotes(state, action);
        expect(newState).not.toBe(state);
        expect(newState).toStrictEqual(action.payload);
      });
    });
  });
});
