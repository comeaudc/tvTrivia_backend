export let globalErr = (err, _req, res, _next) => {
  res.json({ msg: `❌ Error - ${err.message}` });
};

export let log = (req, _res, next) => {
  console.log(`${req.method} - ${req.path}`);
  next();
}