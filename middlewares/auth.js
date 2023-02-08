const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authorization =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzZjE3MTIwMzNiNzhiZjJhNWQzYmQiLCJpYXQiOjE2NzU4ODI4NzF9.wLH1Zt90vSXSsv8Tb2LXQTpY6vI1L4s2be9rzTyAaLY';

  if (!authorization) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  if (!authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Некорректный токен' });
  }

  const token = authorization.replace('Bearer ', '');
  const payload = jwt.verify(token, 'secret-key');

  req.user = payload;

  next();
};
