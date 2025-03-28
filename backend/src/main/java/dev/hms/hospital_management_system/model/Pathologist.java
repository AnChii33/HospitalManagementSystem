package dev.hms.hospital_management_system.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pathologists")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pathologist {

    @Id
    private String id;
    private String pathologistID;
    private String name;
    private String mobileNo;
}
