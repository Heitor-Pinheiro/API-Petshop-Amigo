package com.example.petshop.controller;

import com.example.petshop.model.PetService;
import com.example.petshop.repository.PetServiceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "*")
public class PetServiceController {

    private final PetServiceRepository petServiceRepository;

    public PetServiceController(PetServiceRepository petServiceRepository) {
        this.petServiceRepository = petServiceRepository;
    }

    @GetMapping("/active")
    public List<PetService> getActiveServices() {
        return petServiceRepository.findByStatusOrderByCreatedAtDesc("PENDING");
    }

    @GetMapping("/history")
    public List<PetService> getServiceHistory() {
        return petServiceRepository.findByStatusOrderByCompletedAtDesc("COMPLETED");
    }

    @PostMapping
    public PetService createService(@RequestBody PetService service) {
        service.setStatus("PENDING");
        return petServiceRepository.save(service);
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<PetService> completeService(@PathVariable Long id) {
        return petServiceRepository.findById(id).map(service -> {
            service.setStatus("COMPLETED");
            service.setCompletedAt(LocalDateTime.now());
            return ResponseEntity.ok(petServiceRepository.save(service));
        }).orElse(ResponseEntity.notFound().build());
    }
}
