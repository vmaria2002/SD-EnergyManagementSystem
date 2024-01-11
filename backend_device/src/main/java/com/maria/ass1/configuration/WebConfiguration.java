/*
CORS
 */
package com.maria.ass1.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

//Portul pe care va rula aplicatia web- spring : 3000
@CrossOrigin("http://localhost:3000")
@Configuration
public abstract class WebConfiguration {
    //Folosim Bean pt a injecta dependinte, metode, si a le moddifica in cod
    //E un obiect gestionat de clasa container Spring
    @Bean

    //Permisiuni ale site-ului web: restrictioneaza acces la API
    //Pt toate resursele, http-urile permise sunt cele de mai jos
    public WebConfiguration corsConfigurer() {
        return new WebConfiguration() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedMethods("GET", "PUT", "POST", "DELETE");

            }
        };


    }

    public abstract void addCorsMappings(CorsRegistry registry);
}
