FROM gradle:8.1-jdk17 as app_build

WORKDIR /home/gradle
COPY . .
RUN gradle clean build
# Extract here rather than in the final stage: RUN tar in eclipse-temurin:17 (Ubuntu 26.04)
# fails with ENOSYS on the CodeBuild runner
RUN mkdir /oxs && tar -xf api/build/distributions/api.tar -C /oxs

FROM eclipse-temurin:17

# Copy function code and runtime dependencies from Gradle layout
COPY --from=app_build /oxs /oxs
COPY --from=app_build /home/gradle/oxidation-state-api-public/input_files /oxs/input_files


# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
WORKDIR /oxs
EXPOSE 7070
CMD ./api/bin/api

# for AWS Lambda
ENV AWS_LWA_PORT=7070
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.1 /lambda-adapter /opt/extensions/lambda-adapter
