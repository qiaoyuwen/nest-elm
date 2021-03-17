export class ResponseDataDTO {
  statusCode: number;
  message: string;
  error?: Record<string, string>;
}
