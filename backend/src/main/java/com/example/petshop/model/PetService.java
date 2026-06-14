package com.example.petshop.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "pet_services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PetService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String petName;

    @Column(nullable = false)
    private String breed;

    @Column(nullable = false)
    private String ownerPhone;

    @Column(nullable = false)
    private String serviceType;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    private LocalDateTime completedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = "PENDING";
        }
    }
}
