# https://dev.to/darksmile92/run-gui-app-in-linux-docker-container-on-windows-host-4kde
#https://web.stanford.edu/class/physics91si/2013/handouts/windows_ssh_X11.pdf
# https://medium.com/thefreshwrites/the-way-of-dockerize-a-spring-boot-and-mysql-application-with-docker-compose-de2fc03c6a42

FROM openjdk:17
# install dependentele X11
RUN apt-get update && apt-get install -y \
    x11-apps \
    && rm -rf /var/lib/apt/lists/*

# Setam variabila de mediu pentru X11
ENV DISPLAY=:0
COPY src/ /root/src

WORKDIR /root

ADD target/ass1.jar spring-docker.jar
ENTRYPOINT ["java","-jar","spring-docker.jar"]
VOLUME ["/root/modules"]

