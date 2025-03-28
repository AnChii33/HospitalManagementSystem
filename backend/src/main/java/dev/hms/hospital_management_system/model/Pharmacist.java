package dev.hms.hospital_management_system.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pharmacists")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pharmacist {
    @Id
    private String id;
    private String pharmacistID;
    private String name;
    private String mobileNo;
}
