class ResponseFormatter {
  static success(res, data = {}, message, statusCode = 200) {
    const response = { status: "success", data };

    if (message) response.message = message;

    return res.status(statusCode).json(response);
  }

  static fail(res, message = "", data, statusCode = 400) {
    const response = { status: "fail", message };

    if (data) response.data = data;

    return res.status(statusCode).json(response);
  }

  static error(res, message = "", code = 500, data) {
    const response = { status: "error", message };

    if (data) response.data = data;

    return res.status(code).json(response);
  }
}

export default ResponseFormatter;
