import { PageWithContent } from '../types';
import { iterate } from './iterate';

export async function forEachPagesWithContent(cb: (item: PageWithContent) => void) {
  return iterate(
    'pages',
    `
      {
        slug
        name
        id
        content {
          ... on Gallery {
            id
            name
            taxonomy {
              id
              name
            }
          }
        }
      }
    `,
    cb
  );
}
