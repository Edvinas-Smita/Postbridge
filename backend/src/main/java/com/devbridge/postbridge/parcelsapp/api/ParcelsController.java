package com.devbridge.postbridge.parcelsapp.api;

import com.devbridge.postbridge.parcelsapp.model.Parcels;
import com.devbridge.postbridge.parcelsapp.service.ParcelsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/parcels")
public class ParcelsController {

  Logger logger = LoggerFactory.getLogger(ParcelsController.class);

  @Autowired
  private ParcelsService parcelListService;

  @GetMapping("")
  public ResponseEntity<Parcels> getParcels(){
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }
}
