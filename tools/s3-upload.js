const s3 = require('s3');
const path = require('path');
const build = require('./build');
const task = require('./task');
const config = require('./config');
const keys = require('../keys');

module.exports = task('upload', () => Promise.resolve()
  .then(() => Uploader)
);
const Uploader = new Promise((resolve, reject) => {
  const client = s3.createClient({
  s3Options: {
      accessKeyId: keys.AWS_ACCESS_KEY,
      secretAccessKey: keys.AWS_SECRET_KEY,
      region: 'us-east-1',
      sslEnabled: true,
    },
  });
  const uploader = client.uploadDir({
    localDir: 'public/',
    deleteRemoved: true,
    s3Params: {
      Bucket: 'react-todoapp'
    },
  });
  uploader.on('error', reject);
  uploader.on('end', resolve);
});
