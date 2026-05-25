const errorHandler = (err, req, res, next) => {
	// Log the error in development for debugging
	if (process.env.NODE_ENV !== 'production') {
		console.error(err);
	}

	const statusCode = err.statusCode || 500;
	const message = err.message || 'Internal Server Error';

	res.status(statusCode).json({
		message,
	});
};

export default errorHandler;
