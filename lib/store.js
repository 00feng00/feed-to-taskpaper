const { join, dirname } = require('path');
const { writeFileSync, readFileSync, existsSync } = require('fs');
const mkdirp = require('mkdirp');
const storePath = join(__dirname, '../data/store.json');

function get() {
  if (!existsSync(storePath)) {
    return {};
  } else {
    return JSON.parse(readFileSync(storePath, 'utf-8'));
  }
}

function set(store) {
  mkdirp.sync(dirname(storePath));
  writeFileSync(storePath, JSON.stringify(store, null, 2), 'utf-8');
}

module.exports = { get, set };
