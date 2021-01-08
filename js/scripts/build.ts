import { forEachImages } from '../api/iterateImages';
import rimraf from 'rimraf';
import path from 'path';
import { mkdirSync, writeFileSync } from 'fs';
import TOML from '@iarna/toml';

let count = 0;

const contentBasePath = path.join(__dirname, '..', '..', 'content');

rimraf.sync(path.join(contentBasePath, '*'));

const nodesDirectory = `${contentBasePath}/nodes`;
mkdirSync(nodesDirectory);

forEachImages((imageResource) => {
  if (!imageResource.oldId) {
    return;
  }

  writeFileSync(`${nodesDirectory}/${imageResource.oldId}.md`, ['+++', TOML.stringify({
    title: imageResource.name,
    template: 'image.html',
    extra: {
      id: imageResource.id,
      image: { ...imageResource.image, alt: imageResource.alt },
      old_id: imageResource.oldId,
      taxonomy: imageResource.taxonomy,
    },
  }), '+++', imageResource.body].join('\n'));

  console.info(++count);
});
