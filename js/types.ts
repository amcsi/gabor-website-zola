export type Taxonomy = {
  id: string;
  name: string;
}

export type Asset = {
  height: number;
  fileName: string;
  width: number;
  url: string;
  id: string;
}

export type ImageResource = {
  alt: string;
  body: string;
  id: string;
  name: string;
  oldId: number | null;
  taxonomy: TaxonomyWithPage;
  image: Asset;
}

export type Page = {
  slug: string;
  name: string;
  id: string;
}

type TaxonomyWithPage = Taxonomy & {
  page: Page;
};

export type Gallery = {
  id: string,
  name: string,
  taxonomy: Taxonomy | null,
}

export type PageWithContent = Page & {
  content: (Gallery | Asset)[],
}

export type Menu = {
  pages: Page[],
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
