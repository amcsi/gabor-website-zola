import { ImageResource } from '../types';
import { iterate } from './iterate';
import { imageSelectables } from './selectables';

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
          ${imageSelectables}
        }
      }
    `,
    cb,
    'orderBy: createdAt_DESC',
  );
}
