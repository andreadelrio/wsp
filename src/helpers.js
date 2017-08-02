export function formatPrice(amount) {
  return `C$ ${(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}
