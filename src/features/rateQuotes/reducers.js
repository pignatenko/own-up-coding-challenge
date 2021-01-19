import { PROPERTY_TYPE, OCCUPANCY } from '../../enums';
import { FEATURE_NAME } from '.';


function reduceActionPayload(eventName, state, action) {
  if (action.type !== eventName) {
    return state;
  }

  return {
    ...state,
    ...action.payload
  };
};



export const initialSetLoanSizeState = {
  loanSize: 250000,
}

export function reduceSetLoanSize(state = initialSetLoanSizeState, action) {
  return reduceActionPayload(`${FEATURE_NAME}/setLoanSize`, state, action);
}

export const initialSetCreditScoreState = {
  creditScore: 600,
}

export function reduceSetCreditScore(state = initialSetCreditScoreState, action){
  return reduceActionPayload(`${FEATURE_NAME}/setCreditScore`, state, action);
}

export const initialSetPropertyTypeState = {
  propertyType: PROPERTY_TYPE.SingleFamily
}

export function reduceSetPropertyType(state = initialSetPropertyTypeState, action){
  return reduceActionPayload(`${FEATURE_NAME}/setPropertyType`, state, action);
}

export const initialSetOccupancyState = {
  occupancy: OCCUPANCY.Primary,
};

export function reduceSetOccupancy(state = initialSetOccupancyState, action){
  return reduceActionPayload(`${FEATURE_NAME}/setOccupancy`, state, action);
}

export const initialSetRateQuotesState = {
  rateQuotes: [],
};

export function reduceSetRateQuotes(state = initialSetRateQuotesState, action){
  if (action.payload && action.payload.rateQuotes) {
    action.payload.rateQuotes.forEach((r, idx) => r.id = idx+1);
  }

  return reduceActionPayload(`${FEATURE_NAME}/setRateQuotes`, state, action);
}

export const initialSetRateQuoteErrorsState = {
  rateQuoteErrors: [],
};

export function reduceSetRateQuoteErrors(state = initialSetRateQuoteErrorsState, action){
  return reduceActionPayload(`${FEATURE_NAME}/setRateQuoteErrors`, state, action);
}

export const initialRateQuotesState = Object.assign(
  {},
  initialSetLoanSizeState,
  initialSetCreditScoreState,
  initialSetPropertyTypeState,
  initialSetOccupancyState,
  initialSetRateQuotesState,
  initialSetRateQuoteErrorsState,
);

const reducers = [
  reduceSetLoanSize,
  reduceSetCreditScore,
  reduceSetPropertyType,
  reduceSetOccupancy,
  reduceSetRateQuotes,
  reduceSetRateQuoteErrors,
];

export function reduceRateQuotes(state = initialRateQuotesState, action) {
  return reducers.reduce((newState, reducer ) => reducer(newState, action), state);
};
