const API_TOKEN= "...";
const BASE_URL= "https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod";
const QUOTES_PATH= "quotes";

export async function getRateQuote(loanSize, creditScore, propertyType, occupancy) {
  return fetch(`${BASE_URL}/${QUOTES_PATH}?loanSize=${loanSize}&creditScore=${creditScore}&propertyType=${propertyType}&occupancy=${occupancy}`,
    {
      headers: {
        Authorization: `OU-AUTH ${API_TOKEN}`,
      }
    }
  );
}
