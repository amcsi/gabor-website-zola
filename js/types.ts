export type Taxonomy = {
  id: string;
  name: string;
}

export type ImageAsset = {
  height: number;
  fileName: string;
  width: number;
  url: string;
  id: string;
}

export interface ImageResource {
  alt: string;
  body: string;
  id: string;
  name: string;
  oldId: number | null;
  taxonomy: Taxonomy;
  image: ImageAsset;
}

export interface Connection {
  pageInfo: {
    hasNextPage: boolean,
    endCursor: string,
  },
}

export type ResponseEnvelope<T> = {
  data: T,
}
