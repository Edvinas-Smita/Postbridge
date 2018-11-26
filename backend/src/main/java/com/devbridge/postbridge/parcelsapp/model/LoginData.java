package com.devbridge.postbridge.parcelsapp.model;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginData {
    @NotNull    //could possibly create validation annotations
    public String email;
    @NotNull
    public String password;
}
