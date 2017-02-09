const restify = require('restify');
const plugins = require('restify-plugins');
const port    = require('./config.js').port; 

const phantom = require('phantom');

const server = restify.createServer({
  name: 'Generate outbound links for webpage app',
  version: '1.0.0'
});

async function requestedUrls (url) {
    var result = [ ];
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on("onResourceRequested", function(requestData) {
        console.info('Requesting', requestData.url);
        result.push(requestData.url);
    });

    const status = await page.open(url);

    await instance.exit();
    return result;
}

server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());


server.post('/give', function (req, res, next) {
  if(!req.body.name){
      return next(new restify.BadRequestError("key `name` and corresponding value are missing"));
  };

  requestedUrls(req.body.name)
     .then(x => res.send(JSON.stringify({"data":x})))
     .catch(x => res.send(400))

});

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
