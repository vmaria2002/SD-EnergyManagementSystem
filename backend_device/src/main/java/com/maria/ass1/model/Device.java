package com.maria.ass1.model;

import jakarta.persistence.*;
import lombok.*;
import org.intellij.lang.annotations.Pattern;
import org.jetbrains.annotations.NotNull;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
/**
 Conexiunea cu baza de date + constrangeri asociate
 Constrangeri pt campuri ce nu sunt acceptate null.
 Constrangeri pentru pattern-urile field-urilor. Pentru a asigura o baza de date consistenta
 **/
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    @NotNull("Numele nu poate fi nul. si trebuie sa contina cel putin 3 litere")
    @Pattern("[a-zA-z]+")
    private String name;

    @Column(name = "description")
    @NotNull("Descrierea nu poate fi nula. Trebuie sa contina cifre si litere")
    @Pattern(  "^[a-zA-Z0-9]+")
    private String description;

    @NotNull("Adresa nu poate fi nula. Trebuie sa contina cifre, caractere speciale si litere")
    @Pattern(  "[,:;`'?|!.a-zA-z]")
    @Column(name = "address")
    private String address;


    @Column(name = "max_consumption")
    @NotNull("Numarul orelor de consum  nu poate fi nul.")
    private String maxConsumption;

    /**
     * user_id se accepta null: pentru logica de user-device mapping
     */
    @Column(name = "user_id")
    private Long userTable;
}

