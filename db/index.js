#!/usr/bin/env node

const { initialSetup } = require('./dist/initial_setup');
const creds = require('../creds/postgresql.creds.json');

(function start() {
    const { user, password } = creds;
    initialSetup(user, password);
  })();