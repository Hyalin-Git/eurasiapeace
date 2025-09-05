export function formatCurrency(
  style: string,
  currency: string,
  amount: number
) {
  const format = new Intl.NumberFormat("fr-FR", {
    style: style as Intl.NumberFormatOptions["style"],
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return format.format(amount / 100);
}
