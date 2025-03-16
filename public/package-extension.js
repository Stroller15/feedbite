
// This script creates a zip file of the extension for distribution
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const output = fs.createWriteStream(path.join(__dirname, 'linkedin-summarizer-extension.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', function() {
  console.log('Extension packaged successfully');
  console.log(archive.pointer() + ' total bytes');
});

archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the output file
archive.pipe(output);

// Add all extension files to the zip
archive.directory(path.join(__dirname, 'extension'), false);

// Finalize the archive
archive.finalize();
