#!/usr/bin/env node

const { initialSetup } = require('./dist/initial_setup');
const { createTables } = require('./dist/create_tables');
const creds = require('../../creds/postgresql.creds.json');

(async function start() {
    const { user, password } = creds;
    await initialSetup(user, password);
    await createTables();
  })();