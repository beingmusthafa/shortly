type ServiceResponse<T = {}> = Promise<{
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
}>;

export default ServiceResponse;
