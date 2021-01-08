import { ImageResource } from '../types';
import { iterate } from './iterate';

export async function forEachImages(cb: (item: ImageResource) => void) {
  return iterate(
    'images',
    `
      {
        alt
        body
        id
        name
        oldId
        taxonomy {
          id
          name,
          page {
            id
            name
            slug
          }
        }
        image {
          height
          fileName
          width
          url
          id
        }
      }
    `,
    cb
  );
}
