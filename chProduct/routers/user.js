var Router = require("express").Router;

module.exports = function () {
    var router = new Router();
    router.route("/process").get(sendGF4HTML);
   
    return router;
}

function sendGF4HTML(req, res) {
    res.status(200).sendfile("./app/chProcess.html");
}

 