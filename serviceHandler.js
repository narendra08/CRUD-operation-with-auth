class Handler {
  constructRsponse(serviceResult) {
    const Result = {
      body: (serviceResult && serviceResult.body) || serviceResult || null,
      headers: (serviceResult && serviceResult.headers) || {},
      status: (serviceResult && serviceResult.status) || 200,
    };
    return Result;
  }

  constructErrorResponse(e) {
    console.log("************ Getting Error ************", e);
    if (!e instanceof Error) {
      console.warn(
        "Waning : Expecting Error , but got %s",
        JSON.stringify(e) || "invalid argument"
      );
    }

    if (e.name === "PayloadTooLargeerror") {
      e = "PayloadTooLargeerror";
    }

    if (String(e.name).toUpperCase() === "DBERROR") {
      e = "Db Error";
    }
    let statusCode = 400;
    if (e[0] === "validation error") statusCode = 412;
    const errorResponse = {
      body: { errors: e },
    };
    return errorResponse;
  }

  errorHandler(err, req, res) {
    const errorResponse = this.constructErrorResponse(err);
    res.status(400).send(errorResponse.body);
  }

  serviceHandler(req, res, serviceP) {
    const self = this;
    return serviceP
      .then(self.constructRsponse)
      .catch(self.constructErrorResponse)
      .then(function (result) {
        if (result?.body?.errors && result?.body?.errors[0] === "validation error")
          result.status = 412;
        else if (result?.body?.errors) result.status = 400;
        else result.status = 200;
        res.status(result.status).send(result.body);
      });
  }
}

module.exports = Handler;
