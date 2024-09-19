/**
 * WebPack Configuration for California Design System
 * 
 * @link https://webpack.js.org/configuration/
 */
//.then(module=>module?.default);
const fs = require('fs');
const path =  require('path');

let entry = {
  'bundle': [
    "./src/index.js"
  ]
};

let plugins = [];

// Addional Pages should only be generated when serving.
if( 'serve' === process.argv[2] ){
  
  const directories = [
    path.join(process.cwd(), 'sample', 'demo'),
    path.join(process.cwd(), 'sample', 'parts'),
    path.join(process.cwd(), 'sample', 'structural'),
  ];

  directories.forEach( async (d) => {
    await generatePages( d )
  })

  async function generatePages(directory){
    let CAWebHTMLPlugin = await import('@caweb/html-webpack-plugin').then(module=>module?.default);
    
    fs.readdirSync(directory).forEach(async (f) => {
      if( fs.statSync( path.join(directory, f) ).isDirectory() ){
        return await generatePages( path.join(directory, f) );
      }

      let p = fs.readFileSync( path.join(directory, f) ).toString();
      let t = f.replace(/\.*/, '').replace('-', ' ');
      let filename = directory.replace(/.*[\/\\]?sample[\/\\]?/, '') + `/${f}`
    
      plugins.push(
        new CAWebHTMLPlugin({
          filename,
          title: t.charAt(0).toUpperCase() + t.substring(1),
          template: filename.includes('demo') ? 'default' : 'blank' ,
          templateParameters: {
            bodyHtmlSnippet: p,
          },
          skipAssets: [
            /.*-rtl.css/, // we skip the Right-to-Left Styles
          ]
        })
      )
    })
  }
}

module.exports = {
  entry,
  plugins
}