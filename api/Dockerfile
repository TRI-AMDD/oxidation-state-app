FROM gradle:8.1-jdk11 as app_build

WORKDIR /home/gradle
COPY . .
RUN gradle build

FROM public.ecr.aws/lambda/java:11

# Copy function code and runtime dependencies from Gradle layout
COPY --from=app_build /home/gradle/lambda/build/classes/java/main ${LAMBDA_TASK_ROOT}
COPY --from=app_build /home/gradle/lambda/build/dependencies/* ${LAMBDA_TASK_ROOT}/lib/
  
# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "oxs.lambda.App::handleRequest" ]
