package com.event.event_managment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.event.event_managment.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}