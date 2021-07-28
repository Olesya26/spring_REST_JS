package ru.kolyadina.spring_boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.kolyadina.spring_boot.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmail(String email);

}
