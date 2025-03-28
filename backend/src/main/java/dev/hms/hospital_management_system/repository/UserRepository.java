package dev.hms.hospital_management_system.repository;

import dev.hms.hospital_management_system.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, Integer> {
    User findByLoginID(String loginID);
    User findByLoginIDAndPassword(String loginId, String password);

    boolean existsByLoginID(String doctorID);
}
