package com.event.event_managment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.event.event_managment.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
}