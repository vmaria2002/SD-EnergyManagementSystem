package com.maria.ass1.model;

/**
 * Clasa pentru a genera Chart-uri
 * valoare: valoare obtinuta pentru ora selectata
 */
public class Consum {
    private float valoare;
    private int ora;

    public Consum(float valoare, int ora) {
        this.valoare = valoare;
        this.ora = ora;
    }

    public float getValoare() {
        return valoare;
    }

    public void setValoare(float valoare) {
        this.valoare = valoare;
    }

    public int getOra() {
        return ora;
    }

    public void setOra(int ora) {
        this.ora = ora;
    }
}
