package com.devbridge.postbridge.parcelsapp.api;

import java.util.List;
import javax.validation.Valid;

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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/parcels")
public class ParcelsController {
    Logger logger = LoggerFactory.getLogger(ParcelsController.class);

    @Autowired
    private ParcelsService parcelsService;

    //<editor-fold desc="parcel CRUD" defaultstate="collapsed">
    @PostMapping
    public ResponseEntity<Parcel> createParcel(@RequestBody @Valid Parcel parcel) {
        logger.debug("Checking given data...");
        //TODO: modify @NotNull annotations in parcel class depending on what values we decide to be not null
        if (parcel.getRecipient().getId() == null || parcelsService.getUser(parcel.getRecipient().getId()) == null) {
            logger.debug("Create parcel failed - parcel recipient was: {}", parcel.getRecipient());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);    //TODO: currently this has empty body
        }
        logger.debug("Creating parcel: {}", parcel);
        parcelsService.createParcel(parcel);
        Parcel createdParcel = parcelsService.getParcel(parcel.getId());    //TODO: could not figure out how to save the rest of the properties to the original object
        logger.debug("Saved parcel: {}", createdParcel);
        return new ResponseEntity<>(createdParcel, HttpStatus.CREATED);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Parcel> getParcel(@PathVariable("id") long id) {
        logger.debug("Getting parcel with id={}", id);
        Parcel parcel = parcelsService.getParcel(id);
        logger.debug("Got parcel: {}", parcel);

        return parcel == null
               ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
               : new ResponseEntity<>(parcel, HttpStatus.OK);
    }

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

    @PutMapping
    public ResponseEntity updateParcel(@RequestBody Parcel parcel) {
        logger.debug("Updating parcel with id ({}) from POST body: {}", parcel.getId(), parcel);
        if (parcel.getId() == null) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        boolean modified = parcelsService.updateParcel(parcel);
        logger.debug(modified
                     ? "Parcel successfully updated"
                     : "Parcel was not updated (most likely there was no parcel with that id)");
        return modified
               ? new ResponseEntity(HttpStatus.OK)
               : new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity updateParcel(@PathVariable("id") long id, @RequestBody Parcel parcel) {
        logger.debug("Updating parcel (id={}) with new attributes: {}", id, parcel);
        parcel.setId((int) id); //if ID is also provided in request body it gets ignored
        boolean modified = parcelsService.updateParcel(parcel);
        logger.debug(modified
                     ? "Parcel successfully updated"
                     : "Parcel was not updated (most likely there was no parcel with that id)");
        return modified
               ? new ResponseEntity(HttpStatus.OK)
               : new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Parcel> deleteParcel(@PathVariable("id") long id) {
        logger.debug("deleteParcel started with id {}" + id);
        boolean deleteSuccess = parcelsService.deleteParcel(id);
        logger.debug("deleteParcel finished " + (deleteSuccess
                                                 ? "successfully"
                                                 : "unsuccessfully (most likely there was no parcel with that id)"));
        return deleteSuccess
               ? new ResponseEntity<>(HttpStatus.OK)
               : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    //</editor-fold>

    @GetMapping("/{id}/statusHistory")
    public ResponseEntity<List<ParcelStatusHistory>> getParcelStatusHistory(@PathVariable long id) {
        logger.debug("getParcelStatusHistory started(id=>" + id + ") started...", id);
        List<ParcelStatusHistory> statusHistory = parcelsService.getParcelStatusHistory(id);
        logger.debug("getParcelStatusHistory started(id=>" + id + ") finished", id);

        if (statusHistory != null) {
            return new ResponseEntity<>(statusHistory, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
