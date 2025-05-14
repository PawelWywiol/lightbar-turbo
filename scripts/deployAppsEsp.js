const fs = require('node:fs');
const zlib = require('node:zlib');
const path = require('node:path');

const sourceDir = 'apps/esp/dist';
const destinationDir = 'embedded/esp/data/public_html';
const allowedExtensions = ['.html', '.js', '.css', '.ico', '.png'];
const assetsDir = 'embedded/esp/data/public_html/assets';
const gzPath = (path) => `${path}.gz`;

function deleteAssets(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      const filePath = path.join(directory, file);

      fs.stat(filePath, (err, stats) => {
        if (err) throw err;

        if (stats.isFile()) {
          fs.unlink(filePath, (err) => {
            if (err) throw err;
          });
        } else if (stats.isDirectory()) {
          deleteFiles(filePath);
        }
      });
    }
  });
}

function deployEspEmbeddedApp(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      const filePath = path.join(directory, file);

      fs.stat(filePath, (err, stats) => {
        if (err) throw err;

        if (stats.isFile()) {
          const extension = path.extname(filePath);

          if (allowedExtensions.includes(extension)) {
            const readStream = fs.createReadStream(filePath);
            const writeStream = fs.createWriteStream(gzPath(filePath));
            const gzip = zlib.createGzip();

            readStream.pipe(gzip).pipe(writeStream);

            writeStream.on('finish', () => {
              fs.rename(
                gzPath(filePath),
                path.join(destinationDir, gzPath(path.relative(sourceDir, filePath))),
                (err) => {
                  if (err) throw err;
                },
              );
            });
          }
        } else if (stats.isDirectory()) {
          deployEspEmbeddedApp(filePath);
        }
      });
    }
  });
}

deleteAssets(assetsDir);
deployEspEmbeddedApp(sourceDir);
