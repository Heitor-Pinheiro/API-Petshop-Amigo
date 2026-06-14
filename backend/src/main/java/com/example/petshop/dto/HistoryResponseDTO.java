package com.example.petshop.dto;

import com.example.petshop.model.ProductHistory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoryResponseDTO {
    private Long id;
    private String productName;
    private String actionType;
    private Integer quantityChange;
    private Double oldPrice;
    private Double newPrice;
    private LocalDateTime timestamp;
    private String details;

    public HistoryResponseDTO(ProductHistory history) {
        this.id = history.getId();
        this.productName = history.getProductName();
        this.actionType = history.getActionType();
        this.quantityChange = history.getQuantityChange();
        this.oldPrice = history.getOldPrice();
        this.newPrice = history.getNewPrice();
        this.timestamp = history.getTimestamp();
        this.details = history.getDetails();
    }
}
