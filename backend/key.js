import crypto from 'crypto'

const generateJwtKey = () => {
  const key = crypto.randomBytes(32).toString('hex');
  console.log('Generated JWT key:', key);
};

generateJwtKey();