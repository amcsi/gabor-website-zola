import { Connection, ImageResource } from '../types';
import api from './index';
import { AxiosResponse } from 'axios';

function getQuery(after?: string) {
  const query = after ? `(after: ${JSON.stringify(after)})` : '';
  return `
        query GetAllImages {
          images${query} {
            alt
            body
            id
            name
            oldId
            taxonomy {
              id
              name
            }
            image {
              height
              fileName
              width
              url
              id
            }
          }
          
          imagesConnection${query} {
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;
}

export async function forEachImages(cb: (item: ImageResource) => void) {
  let response: AxiosResponse<AxiosResponse<{ images: ImageResource[], imagesConnection: Connection }>> | undefined;
  do {
    response = await api.get('', {
      params: {
        query: getQuery(response?.data.data.imagesConnection.pageInfo.endCursor),
      }
    });
    for (const item of response.data.data.images) {
      cb(item);
    }

  } while (response.data.data.imagesConnection.pageInfo.hasNextPage);
}
