FROM gradle:8.1-jdk11 as app_build

WORKDIR /home/gradle
COPY . .
RUN gradle build

FROM eclipse-temurin:11

# Copy function code and runtime dependencies from Gradle layout
COPY --from=app_build /home/gradle/build/libs/api.jar /api.jar
  
# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
EXPOSE 7070 
ENTRYPOINT ["java", "-jar", "/api.jar"]
