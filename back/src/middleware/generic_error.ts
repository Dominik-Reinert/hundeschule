import { MiddlewareError } from "./middleware_error";

export class GenericError extends Error implements MiddlewareError {
    public readonly statusCode: number = 500;
    public readonly notification: string = "An error occured, please refresh the page";
}