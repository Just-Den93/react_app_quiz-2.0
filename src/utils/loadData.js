export function loadFileCount() {
  const context = require.context('../data', false, /\.json$/);
  return context.keys().length;
}
