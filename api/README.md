# Oxidation State (Java)

This sample application shows the use of the `aws-lambda-java-events` library with various event types.


The project includes function code and supporting resources:
- `src/main` - A Java function.
- `src/test` - A unit test and helper classes.
- `build.gradle` - A Gradle build file.

Use the following instructions to deploy the sample application.

# Requirements
- [Java 8 runtime environment (SE JRE)](https://www.oracle.com/java/technologies/javase-downloads.html)
- [Gradle 5](https://gradle.org/releases/)
- The Bash shell. For Linux and macOS, this is included by default. In Windows 10, you can install the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to get a Windows-integrated version of Ubuntu and Bash.
- [The AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) v1.17 or newer.

# Setup and build
Create a gradle build.

    $ cd api
    $ gradle build

Build a docker image.

    $ docker build -t oxs-state-api-lambda .


# Deploy to AWS ECR
Tag the docker build, and push it to the AWS ECR.

    $ docker tag oxs-state-api-lambda:latest 626086206245.dkr.ecr.us-east-1.amazonaws.com/oxs-state-api-lambda:latest
    $ docker push 626086206245.dkr.ecr.us-east-1.amazonaws.com/oxs-state-api-lambda:latest
