import {
  Grid,
  Button,
  InputAdornment,
  TextField,
  Input,
  MenuItem,
  InputLabel,
  Select,
} from "@material-ui/core";
import { PROPERTY_TYPE, OCCUPANCY } from "../../enums";
import * as Actions from "./actions";
import { useSelector, useDispatch } from "react-redux";
import "./controls.css";
import NumberFormat from "react-number-format";
import debounce from "lodash/debounce";

const DISPLAY_PROPERTY_TYPE = {
  [PROPERTY_TYPE.SingleFamily]: "Single Family",
  [PROPERTY_TYPE.Condo]: "Condo",
  [PROPERTY_TYPE.Townhouse]: "Townhouse",
  [PROPERTY_TYPE.MultiFamily]: "Multi Family",
};

const DISPLAY_OCCUPANCY = {
  [OCCUPANCY.Primary]: "Primary",
  [OCCUPANCY.Secondary]: "Secondary",
  [OCCUPANCY.Investment]: "Investment",
};

function displayEnum(_enum, displayEnum) {
  return Object.values(_enum).map((id) => (
    <MenuItem key={id} value={id}>
      {displayEnum[id]}
    </MenuItem>
  ));
}

function displayPropertyType() {
  return displayEnum(PROPERTY_TYPE, DISPLAY_PROPERTY_TYPE);
}

function displayOccupancy() {
  return displayEnum(OCCUPANCY, DISPLAY_OCCUPANCY);
}

function selectAllInput(event) {
  const { target } = event;
  target.focus();
  target.setSelectionRange(0, target.value.length);
}

export function RateQuoteControls() {
  const dispatch = useDispatch();

  const handleChange = debounce(function (event) {
    const { name, value } = event.target;

    dispatch(Actions[name](value));
  }, 100);

  const handleLoanSize = debounce(
    (values) => dispatch(Actions.setLoanSize(values.floatValue)),
    100
  );

  const { propertyType, occupancy, loanSize, creditScore } = useSelector(
    (s) => s.rateQuotes
  );
  const isCreditScoreValid = () => 300 <= creditScore && creditScore <= 800;
  const creditScoreHelperText = () =>
    !isCreditScoreValid() ? "must be between 300 and 800" : null;
  const isFormValid = () => isCreditScoreValid();

  return (
    <div className="RateQuoteControls">
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid
          item
          container
          xs={6}
          direction="column"
          justify="space-evenly"
          alignItems="flex-start"
          spacing={5}
        >
          <Grid item>
            <InputLabel htmlFor="rate-quotes-loan-size">Loan Size</InputLabel>
            <NumberFormat
              thousandSeparator
              isNumericString
              id="rate-quotes-loan-amount"
              name="setLoanSize"
              onFocus={selectAllInput}
              value={loanSize.toString()}
              onValueChange={handleLoanSize}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              customInput={Input}
            />
          </Grid>

          <Grid item>
            <InputLabel htmlFor="rate-quotes-credit-score">
              Credit Score
            </InputLabel>
            <NumberFormat
              format="###"
              id="rate-quotes-credit-score"
              name="setCreditScore"
              error={!isCreditScoreValid()}
              helperText={creditScoreHelperText()}
              value={creditScore}
              onFocus={selectAllInput}
              onChange={handleChange}
              customInput={TextField}
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={6}
          direction="column"
          justify="space-evenly"
          alignItems="flex-end"
          spacing={5}
        >
          <Grid item>
            <InputLabel htmlFor="rate-quotes-property-type">
              Property Type
            </InputLabel>
            <Select
              id="rate-quotes-property-type"
              value={propertyType}
              name="setPropertyType"
              onChange={handleChange}
            >
              {displayPropertyType()}
            </Select>
          </Grid>

          <Grid item>
            <InputLabel htmlFor="rate-quotes-occupancy">Occupancy</InputLabel>
            <Select
              id="rate-quotes-occupancy"
              value={occupancy}
              name="setOccupancy"
              onChange={handleChange}
            >
              {displayOccupancy()}
            </Select>
          </Grid>

          <Grid item>
            <Button
              id="rate-quotes-quote-rates"
              disabled={!isFormValid()}
              variant="contained"
              color="primary"
              onClick={() =>
                dispatch(
                  Actions.getRateQuotes(
                    loanSize,
                    creditScore,
                    propertyType,
                    occupancy
                  )
                )
              }
            >
              Quote Rates
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
