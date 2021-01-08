export interface Taxonomy {
  id: string;
  name: string;
}

export interface ImageAsset {
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
  oldId: number;
  taxonomy: Taxonomy;
  image: ImageAsset;
}

export type ResponseEnvelope<T> = {
  data: T,
}
