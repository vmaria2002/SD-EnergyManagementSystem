package model;


import lombok.Getter;
import lombok.Setter;

/**
 Conexiunea cu baza de date + constrangeri asociate
 Constrangeri pt campuri ce nu sunt acceptate null.
 Constrangeri pentru pattern-urile field-urilor. Pentru a asigura o baza de date consistenta
 **/
@Getter
@Setter
public class Monitorizare {
    private Long id;
    private String timestamp;
    private float measurement_value;
    private int device_id;

}

