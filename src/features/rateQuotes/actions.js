const FEATURE = 'rateQuotes';

export function setLoanSize(loanSize){
  return {
    type: `${FEATURE}/setLoanSize`,
    payload: {
      loanSize
    }
  };
}

export function setCreditScore(creditScore){
}
