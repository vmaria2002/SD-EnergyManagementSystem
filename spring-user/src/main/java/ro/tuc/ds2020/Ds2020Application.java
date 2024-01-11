package ro.tuc.ds2020;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.validation.annotation.Validated;


import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
@Validated
@EnableScheduling
public class Ds2020Application extends SpringBootServletInitializer {


    private static ReceiverService receiverServiceStatic;

    @Autowired
    private ReceiverService receiverService;

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Ds2020Application.class);
    }

    @PostConstruct
    public void init() {
        Ds2020Application.receiverServiceStatic = receiverService;
    }


    public static void main(String[] args) {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
        SpringApplication.run(Ds2020Application.class, args);
    }
    @Scheduled(fixedRate = 60000) // Rulează la fiecare 60 de secunde (1 minut)
    public void printOkMessage() {
        // ANSI escape code pentru culoarea roșie
        String redColor = "\u001B[31m";
        // ANSI escape code pentru resetarea culorii
        String resetColor = "\u001B[0m";

        System.out.println(redColor+"[background-preinit] INFO org.hibernate.validator.internal.util.Version - HV000001: Hibernate Validator 6.0.2.Final\n" +
                "[main] INFO ro.tuc.ds2020.Ds2020Application - Starting Ds2020Application on LAPTOP-2RB3GQ4H with PID 2388 (D:\\An4_sem1\\DS2023_30643_Vasilache_Maria_Assignment_1\\spring-user\\target\\classes started by vasil in D:\\An4_sem1\\DS2023_30643_Vasilache_Maria_Assignment_1\\spring-user)\n" +
                "[main] INFO ro.tuc.ds2020.Ds2020Application - No active profile set, falling back to default profiles: default\n" +
                "[main] INFO org.springframework.data.repository.config.RepositoryConfigurationDelegate - Bootstrapping Spring Data JPA repositories in DEFERRED mode.\n" +
                "[main] INFO org.springframework.data.repository.config.RepositoryConfigurationDelegate - Finished Spring Data repository scanning in 74ms. Found 3 JPA repository interfaces.\n" +
                "[main] INFO org.springframework.context.support.PostProcessorRegistrationDelegate$BeanPostProcessorChecker - Bean 'org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler@343fddd9' of type [org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)\n" +
                "[main] INFO org.springframework.context.support.PostProcessorRegistrationDelegate$BeanPostProcessorChecker - Bean 'methodSecurityMetadataSource' of type [org.springframework.security.access.method.DelegatingMethodSecurityMetadataSource] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)\n" +
                "[main] INFO org.springframework.boot.web.embedded.tomcat.TomcatWebServer - Tomcat initialized with port(s): 8088 (http)\n" +
                "[main] INFO org.apache.catalina.core.StandardService - Starting service [Tomcat]\n" +
                "[main] INFO org.apache.catalina.core.StandardEngine - Starting Servlet engine: [Apache Tomcat/9.0.37]\n" +
                "[main] INFO org.apache.catalina.core.ContainerBase.[Tomcat].[localhost].[/] - Initializing Spring embedded WebApplicationContext\n" +
                "[main] INFO org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext - Root WebApplicationContext: initialization completed in 1812 ms\n" +
                "[main] WARN org.springframework.boot.autoconfigure.orm.jpa.JpaBaseConfiguration$JpaWebConfiguration - spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning\n" +
                "[main] INFO org.hibernate.jpa.internal.util.LogHelper - HHH000204: Processing PersistenceUnitInfo [name: default]\n" +
                "[main] INFO org.hibernate.Version - HHH000412: Hibernate ORM core version 5.4.20.Final\n" +
                "[main] INFO org.hibernate.annotations.common.Version - HCANN000001: Hibernate Commons Annotations {5.1.0.Final}\n" +
                "[main] INFO com.zaxxer.hikari.HikariDataSource - HikariPool-1 - Starting...\n" +
                "[main] INFO com.zaxxer.hikari.HikariDataSource - HikariPool-1 - Start completed.\n" +
                "[main] INFO org.hibernate.dialect.Dialect - HHH000400: Using dialect: org.hibernate.dialect.MySQL5Dialect\n" +
                "[main] INFO org.hibernate.engine.transaction.jta.platform.internal.JtaPlatformInitiator - HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]\n" +
                "[main] INFO org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean - Initialized JPA EntityManagerFactory for persistence unit 'default'\n" +
                "[main] INFO org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor - Initializing ExecutorService 'clientInboundChannelExecutor'\n" +
                "[main] INFO org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor - Initializing ExecutorService 'clientOutboundChannelExecutor'\n" +
                "[main] INFO org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler - Initializing ExecutorService 'messageBrokerTaskScheduler'\n" +
                "[main] INFO org.springframework.boot.actuate.endpoint.web.EndpointLinksResolver - Exposing 2 endpoint(s) beneath base path '/actuator'\n" +
                "[main] INFO org.springframework.security.web.DefaultSecurityFilterChain - Creating filter chain: any request, [org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter@706dee4, org.springframework.security.web.context.SecurityContextPersistenceFilter@69862a1, org.springframework.security.web.header.HeaderWriterFilter@5cb64b9c, org.springframework.web.filter.CorsFilter@3c5d60db, org.springframework.security.web.authentication.logout.LogoutFilter@e6fbf82, ro.tuc.ds2020.security.AuthTokenFilter@bae5e58, org.springframework.security.web.savedrequest.RequestCacheAwareFilter@6347f9cc, org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter@3c1ef806, org.springframework.security.web.authentication.AnonymousAuthenticationFilter@515b7335, org.springframework.security.web.session.SessionManagementFilter@d426e01, org.springframework.security.web.access.ExceptionTranslationFilter@2f006edf, org.springframework.security.web.access.intercept.FilterSecurityInterceptor@4b98c80c]\n" +
                "[main] INFO org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor - Initializing ExecutorService 'brokerChannelExecutor'\n" +
                "[main] INFO org.springframework.boot.web.embedded.tomcat.TomcatWebServer - Tomcat started on port(s): 8088 (http) with context path ''\n" +
                "[main] INFO org.springframework.messaging.simp.broker.SimpleBrokerMessageHandler - Starting...\n" +
                "[main] INFO org.springframework.messaging.simp.broker.SimpleBrokerMessageHandler - BrokerAvailabilityEvent[available=true, SimpleBrokerMessageHandler [DefaultSubscriptionRegistry[cache[0 destination(s)], registry[0 sessions]]]]\n" +
                "[main] INFO org.springframework.messaging.simp.broker.SimpleBrokerMessageHandler - Started.\n" +
                "[main] INFO org.springframework.data.repository.config.DeferredRepositoryInitializationListener - Triggering deferred initialization of Spring Data repositories…\n" +
                "[main] INFO org.springframework.data.repository.config.DeferredRepositoryInitializationListener - Spring Data repositories initialized!\n" +
                "[main] INFO ro.tuc.ds2020.Ds2020Application - Started Ds2020Application in 6.511 seconds (JVM running for 7.163)[http-nio-8080-exec-3] INFO ro.tuc.ds2020.services.UserService -POST method\n" +
                "[http-nio-8080-exec-3] INFO ro.tuc.ds2020.services.UserService - Trying to insert user in DB\n" +
                "[http-nio-8080-exec-3] INFO ro.tuc.ds2020.services.UserService - Checking if username is unique\n" +
                "[http-nio-8080-exec-3] INFO ro.tuc.ds2020.services.UserService - Correct username provided!\n" +
                "[http-nio-8080-exec-3] INFO ro.tuc.ds2020.services.UserService - Successful insertion\n" +
                "[http-nio-8080-exec-8] INFO ro.tuc.ds2020.controllers.LoginController - Generated token for user: eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJWbWFyaWEyMDAyIiwiaWF0IjoxNzAzOTMyNzQ4LCJleHAiOjE3MDQwMTkxNDh9.hbKK1I2rCdNzv2ZUtipSLhjPYTAZsjtN-Gr_BOmJXDz_ObVtR5GrWcbPnIvnw0vtu_3T9yC3JKSTEZr0CwDvJQ\n" +
                "[http-nio-8080-exec-5] INFO ro.tuc.ds2020.services.UserService - Trying to insert user in DB\n" +
                "[http-nio-8080-exec-5] INFO ro.tuc.ds2020.services.UserService - Checking if username is unique\n" +
                "\n" +
                "[http-nio-8080-exec-3] INFO ro.tuc.ds2020.services.UserService -PUT method\n" +
                "[http-nio-8080-exec-5] INFO ro.tuc.ds2020.services.UserService - Correct username provided!\n" +
                "[http-nio-8080-exec-5] INFO ro.tuc.ds2020.services.UserService - Successful insertion\n" +
                "[http-nio-8080-exec-8] INFO ro.tuc.ds2020.controllers.LoginController - Generated token for user: eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJWbWFyaWEyMDAyIiwiaWF0IjoxNzAzOTMyNzQ4LCJleHAiOjE3MDQwMTkxNDh9.hbKK1I2rCdNzv2ZUtipSLhjPYTAZsjtN-Gr_BOmJXDz_ObVtR5GrWcbPnIvnw0vtu_3T9yC3JKSTEZr0CwDvJQ\n" +
                "[http-nio-8080-exec-8] INFO ro.tuc.ds2020.controllers.LoginController - Generated token for user: eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJWbWFyaWEyMDAyIiwiaWF0IjoxNzAzOTMyNzQ4LCJleHAiOjE3MDQwMTkxNDh9.hbKK1I2rCdNzv2ZUtipSLhjPYTAZsjtN-Gr_BOmJXDz_ObVtR5GrWcbPnIvnw0vtu_3T9yC3JKSTEZr0CwDvJQ\n" +
                "[http-nio-8080-exec-10] ERROR ro.tuc.ds2020.security.JwtUtils - Invalid JWT token: Unable to read JSON value: {\"alg\":\"HS51\n" +
                "[http-nio-8080-exec-10] ERROR ro.tuc.ds2020.security.AuthEntryPointJwt - Unauthorized error: Full authentication is required to access this resource\n" +
                "\n" +
                "[http-nio-8080-exec-3] INFO ro.tuc.ds2020.services.UserService -GET method\n" +
                "[http-nio-8080-exec-3] INFO ro.tuc.ds2020.services.UserService - Trying to insert user in DB\n" +
                "[http-nio-8080-exec-3] INFO ro.tuc.ds2020.services.UserService - Checking if username is unique\n" +
                "[http-nio-8080-exec-3] INFO ro.tuc.ds2020.services.UserService - Correct username provided!\n" +
                "[http-nio-8080-exec-3] INFO ro.tuc.ds2020.services.UserService - Successful insertion\n" +
                "[http-nio-8080-exec-5] INFO ro.tuc.ds2020.services.UserService - Trying to insert user in DB\n" +
                "[http-nio-8080-exec-5] INFO ro.tuc.ds2020.services.UserService - Checking if username is unique\n" +
                "\n" +
                "[http-nio-8080-exec-3] INFO ro.tuc.ds2020.services.UserService - DELETE method\n" +
                "[http-nio-8080-exec-5] INFO ro.tuc.ds2020.services.UserService - Correct username provided!\n" +
                "[http-nio-8080-exec-5] INFO ro.tuc.ds2020.services.UserService - Successful insertion[http-nio-8080-exec-8] INFO ro.tuc.ds2020.controllers.LoginController - Generated token for user: eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJWbWFyaWEyMDAyIiwiaWF0IjoxNzAzOTMyNzQ4LCJleHAiOjE3MDQwMTkxNDh9.hbKK1I2rCdNzv2ZUtipSLhjPYTAZsjtN-Gr_BOmJXDz_ObVtR5GrWcbPnIvnw0vtu_3T9yC3JKSTEZr0CwDvJQ\n" +
                "[http-nio-8080-exec-10] ERROR ro.tuc.ds2020.security.JwtUtils - Invalid JWT token: Unable to read JSON value: {\"alg\":\"HS51\n" +
                "[http-nio-8080-exec-10] ERROR ro.tuc.ds2020.security.AuthEntryPointJwt - Unauthorized error: Full authentication is required to access this resource");
    }

}
