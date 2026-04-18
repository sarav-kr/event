package com.event.event_managment.model;

import jakarta.persistence.*;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;
    private String userEmail;
    private String userPhone;

    private String eventName;
    private String eventDate;
    private String eventLocation;

    private int quantity;
    private double totalPrice;
}