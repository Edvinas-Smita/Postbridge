package com.devbridge.postbridge.parcelsapp.service;


import java.util.List;

import com.devbridge.postbridge.parcelsapp.mapper.LocationMapper;
import com.devbridge.postbridge.parcelsapp.model.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

    private LocationMapper locationMapper;

    @Autowired
    public LocationService(LocationMapper locationMapper) {
        this.locationMapper = locationMapper;
    }

    public Location getLocation(long id) {
        return locationMapper.getLocation(id);
    }

    public List<Location> getLocations() {
        return locationMapper.getLocations();
    }
}
