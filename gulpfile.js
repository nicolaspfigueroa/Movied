const { src, dest, series } = require('gulp');
const { writeFile } = require('fs/promises');
const del = require('del');
const $ = require('gulp-load-plugins')();

// Utility to ignore unnecessary files
// when generating the glob patterns array for gulp.src()
const addDefSrcIgnore = srcArr =>
  srcArr.concat([
    '!**/REMOVE{,/**}',
    '!node_modules{,/**}',
    '!private{,/**}',
    '!dist{,/**}',
    '!.git{,/**}',
    '!**/.DS_Store',
  ]);

// Clean up previous dist folder
const cleanUp = async () => {
  try {
    await del('dist');
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
};

// Remove solutions from exercises
const removeSolutions = () => {
  return src(addDefSrcIgnore(['**']), { dot: true })
    .pipe(
      $.replace(/^\s*(\/\/|<!--|\/\*)\s*REMOVE-START[\s\S]*?REMOVE-END\s*(\*\/|-->)?\s*$/gm, '')
    )
    .pipe(dest('dist'));
};

// Prepare for distribution to students
const removeMaster = async () => {
  try {
    let npmConfig = require('./package.json');
    npmConfig.scripts.install = 'cd client && npm i .';
    npmConfig.scripts.precommit = 'cd client && ng lint';
    npmConfig = JSON.stringify(npmConfig, null, 2).replace(/-master/g, '');
    await writeFile('dist/package.json', npmConfig);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
};

// export dist command
exports.dist = series(cleanUp, removeSolutions, removeMaster);
