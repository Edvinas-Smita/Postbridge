package com.devbridge.postbridge.parcelsapp.api;

import java.util.List;

import com.devbridge.postbridge.parcelsapp.model.Parcel;
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
@RequestMapping("/api/parcels")
public class ParcelsController {

  Logger logger = LoggerFactory.getLogger(ParcelsController.class);

  @Autowired
  private ParcelsService parcelsService;

  @GetMapping
  public ResponseEntity<List<Parcel>> getParcels() {

    logger.debug("getParcels started...");
    List<Parcel> parcels = parcelsService.getParcels();
    logger.debug("getParcels finished.", parcels);

    if (parcels != null) {
      return new ResponseEntity<>(parcels, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

}
