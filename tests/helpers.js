import { inspect } from 'util';

// Convenience function for printing an entire object
export const print = obj => console.log(inspect(obj, { showHidden: true, depth: null, colors: inspect.colors }));
