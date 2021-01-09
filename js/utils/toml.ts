import TOML, { JsonMap } from '@iarna/toml';

type ContentConfiguration = {
  title: string;
  template: string;
  extra?: JsonMap;
}

export function createPageContent(tomlConfiguration: ContentConfiguration, bodyContent: string = '') {
  return ['+++', TOML.stringify(tomlConfiguration), '+++', bodyContent].join('\n')
}
