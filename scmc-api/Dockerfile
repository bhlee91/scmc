FROM openjdk:17

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} scmc-api.jar

ENTRYPOINT [ "java", "-jar", "scmc-api.jar" ]