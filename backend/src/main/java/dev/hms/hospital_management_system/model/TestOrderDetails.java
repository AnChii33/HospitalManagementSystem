package dev.hms.hospital_management_system.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "test_order_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestOrderDetails {

    @Id
    private String testOrderId;  // Unique ID for the test order

    @DBRef
    private Patient patient;     // Reference to the patient
    @DBRef
    private Pathologist pathologist; // Reference to the pathologist

    private String testDetails;  // Details of the test(s) ordered
    private Date testDate;
    private String testResult;
}
