export function dispatchAndSave(obj) {
  return (dispatch, getState) => {
    dispatch(obj);
    const state = getState();
    console.log('SAVING...');
  };
}
