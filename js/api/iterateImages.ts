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
          urlSmaller: url(
            transformation: {
              document: { output: { format: webp } }
              image: { resize: { width: 650, height: 650, fit: crop } }
              validateOptions: true
            }
          )
          id
        }
      }
    `,
    cb
  );
}
