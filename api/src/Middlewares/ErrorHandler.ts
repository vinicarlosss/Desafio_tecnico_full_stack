import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { HttpException } from "../Exception/HttpException";

const errorHandler : ErrorRequestHandler = (error:unknown, req: Request, res: Response, next: NextFunction) => {
	console.error(error);
	if(error instanceof HttpException) {
		res.status(error.status).json({
			error_code: error.errorCode,
			error_description: error.message,
		})
	}
	res.status(500).json({
		error_code: 'INTERNAL_SERVER_ERROR',
		message: 'Um erro ocorreu no servidor'
	})
}

export default errorHandler;