const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const sourceDir = 'apps/esp/dist';
const destinationDir = 'embedded/esp/data/public_html';
const assetsDir = 'embedded/esp/data/public_html/assets';

function deleteAssets(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
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
    });
  });
}

function deployEspEmbeddedApp(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const filePath = path.join(directory, file);

      fs.stat(filePath, (err, stats) => {
        if (err) throw err;

        if (stats.isFile()) {
          const extension = path.extname(filePath);

          if (extension === '.html' || extension === '.js' || extension === '.css') {
            const readStream = fs.createReadStream(filePath);
            const writeStream = fs.createWriteStream(filePath + '.gz');
            const gzip = zlib.createGzip();

            readStream.pipe(gzip).pipe(writeStream);

            writeStream.on('finish', () => {
              fs.rename(
                filePath + '.gz',
                path.join(destinationDir, path.relative(sourceDir, filePath) + '.gz'),
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
    });
  });
}

deleteAssets(assetsDir);
deployEspEmbeddedApp(sourceDir);
