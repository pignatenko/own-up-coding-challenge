import { configureStore } from "@reduxjs/toolkit";
import { reduceRateQuotes } from "../features/rateQuotes/reducers";

export default configureStore({
  reducer: {
    rateQuotes: reduceRateQuotes,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
