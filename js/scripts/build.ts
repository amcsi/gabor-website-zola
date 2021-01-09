import { forEachImages } from '../api/iterateImages';
import rimraf from 'rimraf';
import path from 'path';
import * as fs from 'fs';
import { writeFileSync } from 'fs';
import TOML from '@iarna/toml';
import { forEachPagesWithContent } from '../api/iteratePages';
import { ImageResource, Menu, Page } from '../types';
import { requestGraphQL } from '../api';
import { createPageContent } from '../utils/toml';
import { copySync } from 'fs-extra';

let count = 0;

const projectBasePath = path.join(__dirname, '..', '..');

const contentBasePath = path.join(projectBasePath, 'content');

// Wipe out existing built content files.
rimraf.sync(path.join(contentBasePath, '*'));

copySync(`${projectBasePath}/dist/content`, contentBasePath);

(async () => {
  const promises = [];

  // This configuration will be available on each .md page for Zola to access.
  const configExtras = {
    pages: [] as Page[],
    imagesById: {} as {[id: string]: ImageResource},
    imageIdsByTaxonomyId: {} as {[id: string]: string[]},
    allImageIds: [] as string[],
    cloudinaryCloud: process.env.CLOUDINARY_CLOUD,
  };

  ///////////////
  // Images
  ///////////////

  // Create pages for each image.
  promises.push(forEachImages((imageResource) => {
    if (!imageResource.oldId) {
      return;
    }

    configExtras.imagesById[imageResource.id] = imageResource;
    configExtras.allImageIds.push(imageResource.id);
    if (!configExtras.imageIdsByTaxonomyId[imageResource.taxonomy.id]) {
      configExtras.imageIdsByTaxonomyId[imageResource.taxonomy.id] = [];
    }
    configExtras.imageIdsByTaxonomyId[imageResource.taxonomy.id].push(imageResource.id);

    writeFileSync(`${contentBasePath}/nodes/${imageResource.oldId}.md`, createPageContent({
      title: imageResource.name,
      template: 'image.html',
      extra: {
        id: imageResource.id,
        image: { ...imageResource.image, alt: imageResource.alt },
        old_id: imageResource.oldId,
        taxonomy: imageResource.taxonomy,
        body: imageResource.body,
      },
    }));

    console.info(++count);
  }));

  ///////////////
  // Menu
  ///////////////

  let configTomlString = fs.readFileSync(`${projectBasePath}/config.base.toml`).toString();

  promises.push((async () => {
    const response = await requestGraphQL<{ menus: Menu[] }>(`
        query Menus {
          menus {
            pages {
              slug
              name
              id
            }
          }
        }
    `);

    const menu = response.data.data.menus[0];

    if (!menu) {
      throw new Error('No menu was found.');
    }

    const pages = menu.pages;

    for (const page of pages) {
      configExtras.pages.push(page);
    }
  })());


  ///////////////
  // Pages
  ///////////////

  promises.push(forEachPagesWithContent(page => {
    const fileBaseName = page.slug || '_index';
    fs.writeFileSync(`${contentBasePath}/${fileBaseName}.md`, createPageContent({
      title: page.name,
      template: 'page.html',
      extra: {
        content: page.content,
      },
    }, ''))
  }));

  await Promise.all(promises);

  configTomlString += TOML.stringify({ extra: configExtras });


  // Build the config.toml file with dynamic variables.
  fs.writeFileSync(`${projectBasePath}/config.toml`, configTomlString);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
