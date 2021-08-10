let helpers = {
  getErrorMessage(statusCode: number): string {
    switch (statusCode) {
      case 301:
        return 'Resource Moved Permanently!';
        break;
      case 400:
        return 'Bad Request!';
        break;
      case 401:
        return 'Request Unauthorized!';
        break;
      case 403:
        return 'Forbidden!';
        break;
      case 404:
        return 'Not Found!';
        break;
      case 408:
        return 'Request Timeout!';
        break;
      case 429:
        return 'Too Many Requests!';
        break;

      case 500:
        return 'Internal Server Error!';
        break;
      case 502:
        return 'Bad Gateway!';
        break;
      case 503:
        return 'Service Unavailable!';
        break;
      case 504:
        return 'Gateway Timeout!';
        break;

      default:
        return 'Something went wrong!';
        break;
    }
  },
};

export default helpers;
