// Middleware til håndtering af 404 - når en route ikke findes
const notFound = (req, res, next) => {
  // Opret en ny Error med information om den manglende route
  const error = new Error(`Ikke fundet - ${req.originalUrl}`);

  // Sæt HTTP status til 404 (Not Found)
  res.status(404);
  next(error); // Send fejlen videre til næste middleware (errorHandler)
};

//Global error-handling middleware
const errorHandler = (err, req, res, next) => {
  // Hvis status er 200 (OK), ændres den til 500 (Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message, // Fejlbesked
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    // Kun vis stack trace i udvikling, ikke produktion
  });
};

module.exports = {
  notFound,
  errorHandler,
};
