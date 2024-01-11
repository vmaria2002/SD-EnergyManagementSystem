package com.maria.ass1.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data

/**
 Conexiunea cu baza de date + constrangeri asociate
 Constrangeri pt campuri ce nu sunt acceptate null.
 Constrangeri pentru pattern-urile field-urilor. Pentru a asigura o baza de date consistenta
 **/
public class Monitorizare {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "timestamp")
    private String timestamp;


    @Column(name = "measurement_value")
    private float measurement_value;


    @Column(name = "device_id")
    private int device_id;


}

