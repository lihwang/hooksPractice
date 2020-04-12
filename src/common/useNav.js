import React, { useCallback } from "react";
import { h0 } from "./fp";
export default function useNav(departDate, dispatch, prevDate, nextDate) {
  const isPrevDisabled = h0(departDate) < h0();
  const isNextDisabled = h0(departDate) - h0() > 20 * 86400 * 1000;
  console.log(
    h0(departDate),
    h0(),
    h0(departDate) - h0(),
    isPrevDisabled,
    isNextDisabled
  );
  const prev = useCallback(() => {
    if (isPrevDisabled) {
      return;
    }
    dispatch(prevDate());
  }, [isPrevDisabled]);
  const next = useCallback(() => {
    if (isNextDisabled) {
      return;
    }
    dispatch(nextDate());
  }, [isNextDisabled]);

  return {
    isPrevDisabled,
    isNextDisabled,
    prev,
    next
  };
}
