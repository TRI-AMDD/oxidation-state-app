FROM public.ecr.aws/lambda/java:11
  
# Copy function code and runtime dependencies from Gradle layout
COPY lambda/build/classes/java/main ${LAMBDA_TASK_ROOT}
COPY lambda/build/dependencies/* ${LAMBDA_TASK_ROOT}/lib/
  
# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "oxs.App::handleRequest" ]