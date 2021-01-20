import { DataGrid } from "@material-ui/data-grid";
import Alert from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";

function* numberFormat(original) {
  let number = original.toString();

  while (number && number.length) {
    yield number.slice(-3);
    number = number.slice(0, -3);
  }
}

function displayDollarAmount(params) {
  if (!params.value) {
    return;
  }

  const [dollars] = params.value.toFixed(2).toString().split(".", 2);
  const generator = numberFormat(dollars);
  const breakout = Array.from(generator);

  return `$${breakout.reverse().join(",")}`;
}

function displayPercentage(params) {
  if (!params.value) {
    return;
  }
  return `%${params.value}`;
}

function displayErrors(errors) {
  return errors.map((error, idx) => (
    <Alert key={idx} severity="error">
      {error}
    </Alert>
  ));
}

export function RateQuoteList() {
  const { rateQuoteErrors, rateQuotes } = useSelector((s) => s.rateQuotes);

  const columns = [
    { field: "lenderName", headerName: "Lender Name", width: 250 },
    { field: "loanType", headerName: "Product", width: 250 },
    {
      field: "interestRate",
      headerName: "Rate",
      width: 100,
      valueFormatter: displayPercentage,
    },
    {
      field: "closingCosts",
      headerName: "Closing Costs",
      width: 200,
      valueFormatter: displayDollarAmount,
    },
    {
      field: "monthlyPayment",
      headerName: "Monthly Payment",
      width: 200,
      valueFormatter: displayDollarAmount,
    },
    {
      field: "apr",
      headerName: "APR",
      width: 100,
      valueFormatter: displayPercentage,
    },
  ];

  return (
    <div className="RateQuoteList">
      {displayErrors(rateQuoteErrors)}

      <DataGrid autoHeight hideFooter columns={columns} rows={rateQuotes} />
    </div>
  );
}
