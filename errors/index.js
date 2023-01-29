/*
 * 定义可以 reusable 的各种 error 用于在 server side 出现故障时进行 throw
 */
import { NotFoundError } from "./not-found.js";
import { BadRequestError } from "./bad-request.js";

export { NotFoundError, BadRequestError };
