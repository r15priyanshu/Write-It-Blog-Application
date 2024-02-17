FROM eclipse-temurin:17.0.10_7-jre-alpine
LABEL maintainer="r15priyanshu" website="https://www.linkedin.com/in/r15priyanshu/"
RUN mkdir -p /app/writeit
WORKDIR /app/writeit
COPY target/writeit-backend.jar .
EXPOSE 8080
CMD ["sh", "-c", "java $JAVA_OPTS -jar writeit-backend.jar"]