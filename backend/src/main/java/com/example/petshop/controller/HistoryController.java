package com.example.petshop.controller;

import com.example.petshop.dto.HistoryResponseDTO;
import com.example.petshop.repository.ProductHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/history")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class HistoryController {

    @Autowired
    private ProductHistoryRepository historyRepository;

    @GetMapping
    public ResponseEntity<List<HistoryResponseDTO>> getHistory() {
        List<HistoryResponseDTO> history = historyRepository.findAllByOrderByTimestampDesc()
                .stream()
                .map(HistoryResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(history);
    }
}
