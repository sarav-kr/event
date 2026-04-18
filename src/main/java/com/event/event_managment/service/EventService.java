package com.event.event_managment.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.event.event_managment.model.Event;
import com.event.event_managment.repository.EventRepository;

@Service
public class EventService {

    @Autowired
    private EventRepository repo;

    public List<Event> getAllEvents() {
        return repo.findAll();
    }

    public Event saveEvent(Event event) {
        return repo.save(event);
    }
}