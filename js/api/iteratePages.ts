import { PageWithContent } from '../types';
import { iterate } from './iterate';
import { imageSelectables } from './selectables';

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
          ... on Asset {
            ${imageSelectables}
          }
          ... on SpecialContent {
            id
            contentType
          }
          ... on Text {
            id
            richText {
              html
            }
          }
        }
      }
    `,
    cb
  );
}
