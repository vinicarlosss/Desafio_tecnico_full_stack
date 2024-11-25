export class HttpException extends Error{
    public status: number;
    public errorCode: string;

    constructor(status: number, errorCode: string, message: string) {
        super(message);
        this.status = status;
        this.errorCode = errorCode;
        Object.setPrototypeOf(this, HttpException.prototype);
    }
}