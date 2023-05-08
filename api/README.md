# Oxidation State (Java)

This sample application shows the use of the `aws-lambda-java-events` library with various event types.


The project includes function code and supporting resources:
- `src/main` - A Java function.
- `src/test` - A unit test and helper classes.
- `build.gradle` - A Gradle build file.

Use the following instructions to deploy the sample application.

# Requirements
- [Java 17 runtime environment (SE JRE)](https://www.oracle.com/java/technologies/javase-downloads.html)
- [Gradle 8.1](https://gradle.org/releases/)
- The Bash shell. For Linux and macOS, this is included by default. In Windows 10, you can install the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to get a Windows-integrated version of Ubuntu and Bash.
- [The AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) v1.17 or newer.

# Run APIs locally

    $ docker-compose up api

# Build and Test APIs locally

Build the gradle application, and run it.

    $ cd api
    $ gradle clean build copyInputFiles
    $ gradle run

You can now make a GET http://localhost:7070/api

# Start API service locally

Build and run the docker API image.

    $ docker-compose start api

You can now make a GET http://localhost:7070/api


# Build Lambda

Build a docker image.

    $ docker build -t oxs-state-api-lambda .

# Test Lambda Locally

Run locally

    $ docker run --rm -p 9000:8080 oxs-state-api-lambda

Try a request (actual payload TBD)

    $ curl -X POST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'

# Deploy to AWS ECR
Tag the docker build, and push it to the AWS ECR.

    $ # setup AWS Creds before the below commands
    $ aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 626086206245.dkr.ecr.us-east-1.amazonaws.com
    $ docker tag oxs-state-api-lambda:latest 626086206245.dkr.ecr.us-east-1.amazonaws.com/oxs-state-api-lambda:latest
    $ docker push 626086206245.dkr.ecr.us-east-1.amazonaws.com/oxs-state-api-lambda:latest
