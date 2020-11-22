import { resolve } from 'path';

export const scriptsPath = resolve(__dirname, '../'); 
export const scriptsDistPath = resolve(scriptsPath, './dist');
export const scriptsSrcPath = resolve(scriptsPath, './src');

export const backendPath = resolve(__dirname, '../../back');
export const backendTsConfigPath = resolve(backendPath, './tsconfig.json');
export const backendSrcPath = resolve(backendPath, './src');
export const backendDistPath = resolve(backendSrcPath, './dist');
export const backendServerExecPath = resolve(backendDistPath, './server.js');
