import { getRateQuote } from "./rate_quote_api_adapter";
import fetchMock from "fetch-mock-jest";
import faker from "faker";
import {PROPERTY_TYPE, OCCUPANCY} from '../enums';
import { RateQuoteItemFactory, RateQuoteFactory } from '../factories/api/getRatesResponseFactory';

describe('RateQuoteApiAdapter', () => {
  describe('#getRateQuote', () => {
    let fakeLenderName;
    let quote;
    let response;
    let loanSize;
    let creditScore;
    let propertyType;
    let occupancy;

    beforeEach(() => {
      fakeLenderName = faker.company.companyName();
      quote = RateQuoteItemFactory({ lenderName: fakeLenderName });
      response = RateQuoteFactory({ rateQuotes: [quote] });

      loanSize = faker.random.number();
      creditScore = faker.random.number({min:0, max: 850});
      propertyType = faker.random.arrayElement(Object.values(PROPERTY_TYPE));
      occupancy = faker.random.arrayElement(Object.values(OCCUPANCY));

      fetchMock.mock(
        { url: "https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes",
          method: 'GET',
          query: { loanSize, creditScore, propertyType, occupancy },
          headers: { Authorization: "OU-AUTH ..." },
        },
        response,
      );
    });

    it('returns loan rates when given loanSize, creditScore, propertyType, and occupancy required parameters', async () => {
      const apiResponse = await getRateQuote(loanSize, creditScore, propertyType, occupancy);
      const body = await apiResponse.json();
      expect(body).toBeDefined();
      expect(body.rateQuotes.length).toBe(1);
      expect(body.rateQuotes[0].lenderName).toBe(fakeLenderName);
    });
  });
});
