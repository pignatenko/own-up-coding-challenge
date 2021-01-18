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
