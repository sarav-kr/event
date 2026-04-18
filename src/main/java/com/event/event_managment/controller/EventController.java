package com.event.event_managment.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.event.event_managment.model.Event;
import com.event.event_managment.service.EventService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService service;

    @GetMapping
    public List<Event> getEvents() {
        return service.getAllEvents();
    }

    @PostMapping
    public Event addEvent(@RequestBody Event event) {
        return service.saveEvent(event);
    }
}