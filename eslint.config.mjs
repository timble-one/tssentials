// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import * as reactHooks from "typescript-eslint";

export default tseslint.config(
  {
      ignores: ['dist']
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs.recommended,
);
