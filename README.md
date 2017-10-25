# Jigmi - Jitsi Generic Monitoring Infrastructure
This repo is for tracking and displaying various metrics that we want to track over time.  For now it's far less ambitious than its name and will be used for tracking PSNR calculations over time, but may be extended in the future to track more data.  It is designed to be used in conjunction with Jenkins CI, and refers to/uses variables defined in the Jenkins environment (such as build url, build number, etc.)

### Building/deploying
`npm install`
`npm start`
The web server will run on port 8000 by default.  The port can be customized by setting the `PORT` env variable, such as:
`PORT=8888 npm start`

The web server currently serves 3 endpoints:
* `/` will server the webpage which will display the charts
* POSTing to `/psnrResult` will allow pushing a new PSNR result.  The body should be JSON encoded like so:
```
{
    "buildNum": <string: jenkins build number>,
    "buildUrl": <string: jenkins build url>,
    "psnrValue": <float: psnr value>
}
```
* GETing from `/psnrResults` will return all currently stored PSNR results, formatted like so:
```
[
    {
        "buildNum": 3,
        "buildUrl": "http://ci.jitsi.org/brianbuild",
        "psnrValue": 44.22225,
        "timestamp": "2017-10-24 19:13:35"
    },
    {
        "buildNum": 4,
        "buildUrl": "http://ci.jitsi.org/brianbuild",
        "psnrValue": 41.22225,
        "timestamp": "2017-10-24 19:13:47"
    }
]
```

