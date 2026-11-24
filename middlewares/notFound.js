function notFound(res, req, next) {
  res.status(404).json({
    error: "Api endpoint not found",
  });
}

export default notFound;
