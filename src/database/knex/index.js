import { development } from "../../../knexfile.js";

import pkg from 'knex';
const { knex } = pkg;

export const connection = knex(development)