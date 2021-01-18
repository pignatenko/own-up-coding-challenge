import { getRateQuote } from '../../adapters/rate_quote_api_adapter';
const FEATURE = 'rateQuotes';

function createSetterAction(name, payloadPropertyName, payload) {
  const action = {
    type: `${FEATURE}/${name}`,
    payload: {
    }
  };

  action.payload[payloadPropertyName] = payload;
  return action;
}

export function setLoanSize(loanSize){
  return createSetterAction('setLoanSize', 'loanSize', loanSize);
}

export function setCreditScore(creditScore){
  return createSetterAction('setCreditScore', 'creditScore', creditScore);
}

export function setPropertyType(propertyType){
  return createSetterAction('setPropertyType', 'propertyType', propertyType);
}

export function setOccupancy(occupancy){
  return createSetterAction('setOccupancy', 'occupancy', occupancy);
}

export function setRateQuotes(rateQuotes){
  return createSetterAction('setRateQuotes', 'rateQuotes', rateQuotes);
}

export function setRateQuoteErrors(rateQuoteErrors){
  return createSetterAction('setRateQuoteErrors', 'rateQuoteErrors', rateQuoteErrors);
}

export function getRateQuotes(loanSize, creditScore, propertyType, occupancy){
  return async (dispatch) => {
    try {
      const response = await getRateQuote(loanSize, creditScore, propertyType, occupancy);
      const rateQuoteResponseBody = await response.json();

      if (response.ok) {
        dispatch(setRateQuotes(rateQuoteResponseBody.rateQuotes));
      } else {
        dispatch(setRateQuoteErrors(rateQuoteResponseBody.errors));
      }
    } catch (err) {
      const errors = [err.message];
      dispatch(setRateQuoteErrors(errors));
    }
  };
}
