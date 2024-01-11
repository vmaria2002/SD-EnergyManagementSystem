# https://medium.com/thefreshwrites/the-way-of-dockerize-a-spring-boot-and-mysql-application-with-docker-compose-de2fc03c6a42
FROM maven:3.6.3-openjdk-17 AS builder

COPY src/ /root/src

COPY pom.xml /root/

WORKDIR /root

FROM openjdk:17

ADD target/ass1-0.0.1-SNAPSHOT.jar spring-docker.jar
ENTRYPOINT ["java","-jar","spring-docker.jar"]
EXPOSE 8083
VOLUME ["/root/modules"]

