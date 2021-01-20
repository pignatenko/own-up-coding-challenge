import faker from "faker";

export function RateQuoteItemFactory({
  lenderName = faker.company.companyName(),
  loanType = faker.commerce.productName(),
  interestRate = faker.random.float(),
  closingCosts = faker.random.number(),
  monthlyPayment = faker.random.float(),
  apr = faker.random.float(),
} = {}) {
  return {
    lenderName,
    loanType,
    interestRate,
    closingCosts,
    monthlyPayment,
    apr,
  };
}

function buildRateQuotes() {
  return [
    RateQuoteItemFactory(),
    RateQuoteItemFactory(),
    RateQuoteItemFactory(),
  ];
}

export function RateQuoteFactory({ rateQuotes = buildRateQuotes() } = {}) {
  return {
    rateQuotes,
  };
}
