// awsConfig.js
import AWS from 'aws-sdk';

const awsConfig = {
    accessKeyId: 'REDACTED_ACCESS_KEY',
    secretAccessKey: 'REDACTED_SECRET_KEY',
    region: 'eu-north-1'
};

AWS.config.update(awsConfig);

export default AWS;
