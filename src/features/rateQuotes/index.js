import { RateQuoteControls } from './controls';
// import { RateQuoteList } from './list';
import { Container } from '@material-ui/core';

export const FEATURE_NAME = 'rateQuotes';

export function RateQuotes() {
  return (
    <div className="RateQuotes">
      <Container maxWidth="md">
        <RateQuoteControls/>
      </Container>

      <Container>
        {/* <RateQuoteList/> */}
      </Container>
    </div>

  );
};
