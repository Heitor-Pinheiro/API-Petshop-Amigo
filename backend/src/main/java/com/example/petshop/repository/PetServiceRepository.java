package com.example.petshop.repository;

import com.example.petshop.model.PetService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetServiceRepository extends JpaRepository<PetService, Long> {
    List<PetService> findByStatusOrderByCreatedAtDesc(String status);
    List<PetService> findByStatusOrderByCompletedAtDesc(String status);
}
