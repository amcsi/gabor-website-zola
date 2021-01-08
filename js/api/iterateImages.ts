import { ImageAsset, ImageResource, ResponseEnvelope } from '../types';
import api from './index';

export async function forEachImages(cb: (item: ImageAsset) => void) {
  const result = await api.get<ResponseEnvelope<{ image: ImageResource }>>('', {
    params: {
      query: `
        query GetAllImages {
          images {
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
        }
      `
    }
  });
  console.info({data: result.data});
}
