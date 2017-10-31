# Jigmi - Jitsi Generic Monitoring Infrastructure
This repo is for tracking and displaying various metrics that we want to track over time.  For now it's far less ambitious than its name and will be used for tracking PSNR calculations over time, but may be extended in the future to track more data.  It is designed to be used in conjunction with Jenkins CI, and refers to/uses variables defined in the Jenkins environment (such as build url, build number, etc.)

### Building/deploying
`npm install`
`npm start`
The web server will run on port 8000 by default.  The port can be customized by setting the `PORT` env variable, such as:
`PORT=8888 npm start`

### Pushing/accessing data
The web server currently serves 3 endpoints:
* `/` will server the webpage which will display the charts
* POSTing to `/psnrResult` will allow pushing a new PSNR test result.  The body should be JSON encoded like so:
```
{
    "buildNum": <string: jenkins build number>,
    "buildUrl": <string: jenkins build url>,
    "psnr": <float: psnr value>
	"numSkippedFrames": <int: number of frames skipped during the test>,
	"numFrozenFrames": <int: the duration of frozen video, in frames>,
	"totalFrames": <int: the total amount of frames captured in the test>
}
```
* GETing from `/psnrResults` will return all currently stored PSNR results, formatted like so:
```
[
    {
        "buildNum": 31,
        "buildUrl": "31",
        "psnr": 38.04434,
        "numFrozenFrames": 35,
        "numSkippedFrames": 33,
        "totalFrames": 303,
        "createdAt": "2017-10-30T20:21:44.001Z",
        "updatedAt": "2017-10-30T20:21:44.001Z"
    },
    {
        "buildNum": 43,
        "buildUrl": "http://ci.jitsi.org/brianbuild/25",
        "psnr": 37.9476,
        "numFrozenFrames": 14,
        "numSkippedFrames": 10,
        "totalFrames": 300,
        "createdAt": "2017-10-30T18:02:45.465Z",
        "updatedAt": "2017-10-30T18:02:45.465Z"
    }
]
```

