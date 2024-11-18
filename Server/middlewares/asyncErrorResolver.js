const asyncErrorResolver = (fn) => (req,res,next) => {
    Promise.resolve(fn(req,res,next)).catch(next);
}

module.exports = asyncErrorResolver;