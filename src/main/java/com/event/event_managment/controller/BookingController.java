package com.event.event_managment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.event.event_managment.model.Booking;
import com.event.event_managment.repository.BookingRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository repo;

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return repo.save(booking);
    }
}