package dev.hms.hospital_management_system.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Document(collection = "admin")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Admin {
    @Id
    private String id;  // Unique ID for the admin
    private final String passkey = "123456"; // Fixed 6-character passkey
}
