import getConfig from 'next/config'
import fs from 'fs';
import path from 'path';
import { createClient } from 'contentful';

const {serverRuntimeConfig, publicRuntimeConfig} = getConfig()
const SPACE = serverRuntimeConfig.CONTENTFUL_SPACE
const TOKEN = serverRuntimeConfig.CONTENTFUL_TOKEN

console.log(process.env);

const client = createClient({
  space: SPACE,
  accessToken: TOKEN
});

const types = [
  'pageHome'
];

export const getcontent = async () => {
  types.forEach(() => {
    const entries = await client.getEntries({
      content_type: type,
      include: 3
    });

    if (entries.total) {
      const { fields } = entries.items[0];
      fs.writeFileSync(
        path.join(__dirname, '..', 'data', `${type.json}`),
        JSON.stringify(fields)
      );
    }
  });
  return true;
}

if (process.argv[2] === 'install') {
  getcontent();
}