/**
 * Pause — financial calculation utilities
 * All formulas validated against the product spec.
 */

/**
 * Monthly surplus available for debt repayment.
 * We use 60% of net income after fixed expenses to account for
 * variable spending — food, transport, misc.
 *
 * monthly surplus = (income - fixedExpenses) × 0.6
 */
export function monthlySurplus(income: number, fixedExpenses: number): number {
  return (income - fixedExpenses) * 0.6;
}

/**
 * Number of months until debt is cleared.
 *
 * debtFreeMonths = totalDebt / monthlySurplus
 */
export function debtFreeMonths(totalDebt: number, surplus: number): number {
  if (surplus <= 0) return Infinity;
  return totalDebt / surplus;
}

/**
 * How many days a one-time purchase pushes the debt-free date.
 *
 * daysAdded = (purchaseAmount / monthlySurplus) × 30
 */
export function daysAddedByPurchase(amount: number, surplus: number): number {
  if (surplus <= 0) return Infinity;
  return (amount / surplus) * 30;
}

/**
 * Extra interest accrued by delaying payoff.
 * Uses simple interest approximation: annualRate / 365 × daysAdded × remainingDebt
 */
export function extraInterest(
  remainingDebt: number,
  annualRatePct: number,
  daysAdded: number
): number {
  return (remainingDebt * (annualRatePct / 100) * daysAdded) / 365;
}

/**
 * Weekly discretionary budget.
 *
 * weeklyBudget = (income - fixedExpenses - monthlyDebtPayment) / 4
 */
export function weeklyBudget(
  income: number,
  fixedExpenses: number,
  monthlyDebtPayment: number
): number {
  return (income - fixedExpenses - monthlyDebtPayment) / 4;
}

/**
 * Add `months` to a Date and return the resulting Date.
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + Math.floor(months));
  const extraDays = (months % 1) * 30;
  result.setDate(result.getDate() + Math.round(extraDays));
  return result;
}

/**
 * Add `days` to a Date and return the resulting Date.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + Math.round(days));
  return result;
}

/**
 * Format a Date as "D Month YYYY" (e.g. "14 March 2027").
 */
export function formatDebtFreeDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Format a Date as short form "D MMM YYYY" (e.g. "14 Mar 2027").
 */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Format a number as Indian currency without the ₹ symbol.
 * e.g. 340000 → "3,40,000"
 */
export function formatIndianNumber(n: number): string {
  return n.toLocaleString("en-IN");
}
