const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Helper function to run commands
function runCommand(command) {
  console.log(`Running: ${command}`);
  execSync(command, { stdio: 'inherit' });
}

// Helper function to create directories if they don't exist
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Helper function to update package.json
function updatePackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Update scripts
  packageJson.scripts = {
    ...packageJson.scripts,
    serve: 'vite',
    build: 'vite build',
    preview: 'vite preview',
    lint: 'eslint --ext .js,.vue --ignore-path .gitignore --fix src'
  };

  // Remove Vue CLI dependencies
  const vueCliDepsToRemove = [
    '@vue/cli-plugin-babel',
    '@vue/cli-plugin-eslint',
    '@vue/cli-plugin-pwa',
    '@vue/cli-plugin-router',
    '@vue/cli-service',
    '@vue/compiler-sfc'
  ];

  // Add Vite dependencies
  const viteDeps = {
    'vite': '^5.0.0',
    '@vitejs/plugin-vue': '^5.0.0',
    'vite-plugin-pwa': '^0.17.0'
  };

  // Add ESLint dependencies for Vite
  const eslintDeps = {
    'eslint-plugin-vue': '^9.17.0',
    'vue-eslint-parser': '^9.3.2',
    '@vue/eslint-config-prettier': '^8.0.0'
  };

  // Remove Vue CLI dependencies
  vueCliDepsToRemove.forEach(dep => {
    if (packageJson.devDependencies[dep]) {
      delete packageJson.devDependencies[dep];
    }
  });

  // Add Vite dependencies
  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    ...viteDeps,
    ...eslintDeps
  };

  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('Updated package.json');
}

// Create Vite config
function createViteConfig() {
  const viteConfigContent = `
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Phunkey Patient Portal',
        short_name: 'Patient Portal',
        theme_color: '#4DBA87',
        background_color: '#ffffff',
        icons: [
          {
            src: 'img/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'img/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
  server: {
    port: 8080,
    https: false
  }
});
`;

  fs.writeFileSync('vite.config.js', viteConfigContent);
  console.log('Created vite.config.js');
}

// Create index.html in project root
function createIndexHtml() {
  const templatePath = path.join(process.cwd(), 'public', 'index.html');
  let content = '';
  
  if (fs.existsSync(templatePath)) {
    content = fs.readFileSync(templatePath, 'utf8');
    
    // Replace base href if it exists
    content = content.replace(/<base href=".*">/, '<base href="/">');
    
    // Add import of main.js
    content = content.replace('</body>', '  <script type="module" src="/src/main.js"></script>\n</body>');
    
    // Update asset paths if needed
    content = content.replace(/src="\/js/g, 'src="/src/js');
    content = content.replace(/href="\/css/g, 'href="/src/css');
  } else {
    // Create a basic index.html if it doesn't exist
    content = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Phunkey Patient Portal</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`;
  }

  fs.writeFileSync('index.html', content);
  console.log('Created index.html');
}

// Create .env files
function createEnvFiles() {
  // For development
  const envDevContent = `VITE_APP_TITLE=Patient Portal (Development)
`;
  fs.writeFileSync('.env.development', envDevContent);
  
  // For production
  const envProdContent = `VITE_APP_TITLE=Patient Portal
`;
  fs.writeFileSync('.env.production', envProdContent);
  
  console.log('Created environment files');
}

// Create ESLint config
function createEslintConfig() {
  const eslintContent = `module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2022: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  rules: {
    'space-before-function-paren': 'off',
    'new-cap': 'off',
    'no-undef': 'warn',
    'no-empty': 'warn',
    'no-unused-vars': 'warn',
    'vue/no-unused-components': 'warn',
    'vue/multi-word-component-names': 'off',
    'prefer-regex-literals': 'off'
  }
}
`;
  fs.writeFileSync('.eslintrc.js', eslintContent);
  console.log('Created .eslintrc.js');
}

// Update environment variable usage in code
function updateEnvUsage() {
  console.log('Updating environment variable usage...');
  
  const filesToUpdate = [];
  
  function findJsAndVueFiles(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findJsAndVueFiles(filePath);
      } else if (stat.isFile() && (file.endsWith('.js') || file.endsWith('.vue'))) {
        filesToUpdate.push(filePath);
      }
    });
  }
  
  findJsAndVueFiles('./src');
  
  filesToUpdate.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // Replace process.env.VUE_APP_X with import.meta.env.VITE_APP_X
    content = content.replace(/process\.env\.VUE_APP_/g, 'import.meta.env.VITE_APP_');
    fs.writeFileSync(file, content);
  });
  
  console.log(`Updated environment variables in ${filesToUpdate.length} files`);
}

// Main migration function
async function migrateToVite() {
  try {
    console.log('Starting migration to Vite...');
    
    // Backup package.json
    fs.copyFileSync('package.json', 'package.json.backup');
    console.log('Backed up package.json');
    
    // Update package.json
    updatePackageJson();
    
    // Create Vite config
    createViteConfig();
    
    // Create index.html
    createIndexHtml();
    
    // Create .env files
    createEnvFiles();
    
    // Create ESLint config
    createEslintConfig();
    
    // Update environment variable usage
    updateEnvUsage();
    
    console.log('Installing dependencies...');
    runCommand('npm install');
    
    console.log('Migration completed successfully!');
    console.log('You can now run the development server with:');
    console.log('npm run serve');
    
  } catch (error) {
    console.error('Migration failed:', error);
    console.log('Restoring package.json from backup...');
    
    if (fs.existsSync('package.json.backup')) {
      fs.copyFileSync('package.json.backup', 'package.json');
      console.log('Restored package.json from backup');
    }
  }
}

// Run migration
migrateToVite();
