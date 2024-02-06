/* 
De vuelve un valor entre 
minResult y maxResult
de acuerdo a value según un rango
determinado por minValue y maxValue.
*/
export const useInterpolate = (
  value,
  minValue,
  maxValue,
  minResult,
  maxResult
) => {
  return (
    ((value - minValue) / (maxValue - minValue)) * (maxResult - minResult) +
    minResult
  );
};
