/**
 * Stops an event from propagating upwards.
 *
 * @param {Event} e the event to be handled
 * @param {Function} callback callback function to handle event
 */
export function handleEventWithoutPropagation(e, callback) {
  e.stopPropagation();
  callback(e);
}
