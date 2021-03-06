import { resolve } from 'path';

export const scriptsPath = resolve(__dirname, '../'); 
export const scriptsDistPath = resolve(scriptsPath, './dist');
export const scriptsSrcPath = resolve(scriptsPath, './src');

export const backendPath = resolve(__dirname, '../../back');
export const backendTsConfigPath = resolve(backendPath, './tsconfig.json');
export const backendSrcPath = resolve(backendPath, './src');
export const backendDistPath = resolve(backendPath, './dist');
export const backendServerExecPath = resolve(backendDistPath, './server.js');


export const frontendPath = resolve(__dirname, '../../front');
export const frontendTsConfigPath = resolve(frontendPath, './tsconfig.json');
export const frontendSrcPath = resolve(frontendPath, './src');
export const frontendDistPath = resolve(frontendPath, './dist');
export const frontendServerConfigPath = resolve(frontendPath, '../webpack.config.js');

export const nodeModulesPath = resolve(__dirname, '../../node_modules')
export const typescriptCommandpath = resolve(nodeModulesPath, './typescript/bin/tsc')
export const nodemonCommandpath = resolve(nodeModulesPath, './nodemon/bin/nodemon.js')
