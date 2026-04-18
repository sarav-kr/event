package com.event.event_managment.model;

import jakarta.persistence.*;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String date;
    private String location;
    private double price;
    private String description;

    // Getters & Setters
}