import { Connection, ResponseEnvelope } from '../types';
import { AxiosResponse } from 'axios';
import { requestGraphQL } from './index';

function getQuery(resourceName: string, properties: string, after?: string) {
  const query = after ? `(after: ${JSON.stringify(after)})` : '';
  return `
        query GetAllImages {
          ${resourceName}${query} ${properties}
          
          ${resourceName}Connection${query} {
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;
}

/**
 * Iterates a resource from graphql including doing pagination.
 */
export async function iterate<T, ResourceName extends string>(resourceName: ResourceName, properties: string, cb: (item: T) => void) {
  type ResourceConnectionName = `${ResourceName}Connection`;
  const resourceConnectionName = `${resourceName}Connection`;

  let response: AxiosResponse<
    ResponseEnvelope<{
      [resourceCollection in ResourceConnectionName]: Connection
    } & {
      [resource in ResourceName]: T[]
    }>
  > | undefined;
  do {
    response = await requestGraphQL(getQuery(
      resourceName,
      properties,
      response?.data.data[resourceConnectionName].pageInfo.endCursor,
    ));
    for (const item of response.data.data[resourceName]) {
      cb(item);
    }

  } while (response.data.data[resourceConnectionName].pageInfo.hasNextPage);
}

