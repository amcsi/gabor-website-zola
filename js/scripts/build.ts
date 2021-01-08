import { forEachImages } from '../api/iterateImages';

let count = 0;

forEachImages((imageResource) => {
  console.info(++count);
});
