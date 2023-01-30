const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      'eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b ',
    );
  } catch (err) {
    return res.status(401).send({ message: 'Необходимо авторизоваться' });
  }

  req.user = payload;

  next();
};
