package com.devbridge.postbridge.parcelsapp.api;

import java.util.List;

import com.devbridge.postbridge.parcelsapp.model.Location;
import com.devbridge.postbridge.parcelsapp.service.LocationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/locations")
public class LocationController {
    private Logger logger = LoggerFactory.getLogger(LocationController.class);

    @Autowired
    private LocationService locationService;

    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocation(@PathVariable("id") long id) {
        logger.debug("Getting location with id={}", id);
        Location location = locationService.getLocation(id);
        logger.debug("Got location: {}", location);

        return location == null
               ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
               : new ResponseEntity<>(location, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Location>> getLocations() {
        logger.debug("Getting all locations...");
        List<Location> locations = locationService.getLocations();
        logger.debug("Got locations: {}", locations);

        return locations == null
               ? new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
               : locations.isEmpty()
                 ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
                 : new ResponseEntity<>(locations, HttpStatus.OK);
    }
}
