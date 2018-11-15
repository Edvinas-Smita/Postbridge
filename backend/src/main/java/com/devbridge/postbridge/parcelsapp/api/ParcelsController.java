package com.devbridge.postbridge.parcelsapp.api;

import java.util.List;

import com.devbridge.postbridge.parcelsapp.model.Parcel;
import com.devbridge.postbridge.parcelsapp.model.ParcelStatusHistory;
import com.devbridge.postbridge.parcelsapp.service.ParcelsService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    logger.debug("getParcels finished." + parcels);

    if (parcels != null) {
      return new ResponseEntity<>(parcels, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @GetMapping("/{id}/statusHistory")
  public ResponseEntity<List<ParcelStatusHistory>> getParcelStatusHistory(@PathVariable long id){
    logger.debug("getParcelStatusHistory started(id=>" + id + ") started...", id);
    List<ParcelStatusHistory> statusHistory = parcelsService.getParcelStatusHistory(id);
    logger.debug("getParcelStatusHistory started(id=>" + id + ") finished", id);

    if (statusHistory != null) {
      return new ResponseEntity<>(statusHistory, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Parcel> deleteParcel(@PathVariable("id") long id) {
    logger.debug("deleteParcel started with id " + id);
    parcelsService.deleteParcel(id);
    logger.debug("deleteParcel finished with id " + id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
