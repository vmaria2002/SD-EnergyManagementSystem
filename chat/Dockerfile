FROM maven:3.6.3-openjdk-17 AS builder

COPY src/ /root/src
COPY pom.xml /root/

WORKDIR /root

FROM openjdk:17

ADD target/chat-0.0.1-SNAPSHOT.jar spring-docker.jar
ENTRYPOINT ["java","-jar","spring-docker.jar"]
EXPOSE 8084
VOLUME ["/root/modules"]
