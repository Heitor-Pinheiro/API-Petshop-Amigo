package com.example.petshop.controller;

import com.example.petshop.dto.ProductRequestDTO;
import com.example.petshop.dto.ProductResponseDTO;
import com.example.petshop.dto.SellRequestDTO;
import com.example.petshop.model.Product;
import com.example.petshop.model.ProductHistory;
import com.example.petshop.repository.ProductRepository;
import com.example.petshop.repository.ProductHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductHistoryRepository historyRepository;

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        List<ProductResponseDTO> products = productRepository.findAllByActiveTrue()
                .stream()
                .map(ProductResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(products);
    }

    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(@RequestBody ProductRequestDTO data) {
        Product product = Product.builder()
                .name(data.getName())
                .description(data.getDescription())
                .price(data.getPrice())
                .quantity(data.getQuantity())
                .image(data.getImage())
                .active(true)
                .build();

        Product savedProduct = productRepository.save(product);

        // Record history
        ProductHistory history = ProductHistory.builder()
                .productName(savedProduct.getName())
                .actionType("ADD")
                .quantityChange(savedProduct.getQuantity())
                .oldPrice(null)
                .newPrice(savedProduct.getPrice())
                .timestamp(LocalDateTime.now())
                .details(String.format("Produto adicionado com estoque inicial de %d unidades.", savedProduct.getQuantity()))
                .build();
        historyRepository.save(history);

        return ResponseEntity.ok(new ProductResponseDTO(savedProduct));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable Long id, @RequestBody ProductRequestDTO data) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty() || !optionalProduct.get().getActive()) {
            return ResponseEntity.notFound().build();
        }

        Product product = optionalProduct.get();
        String oldName = product.getName();
        Double oldPrice = product.getPrice();
        Integer oldQuantity = product.getQuantity();

        // Check details of what changed for history logging
        StringBuilder changeDetails = new StringBuilder("Produto editado: ");
        boolean changed = false;

        if (!product.getName().equals(data.getName())) {
            changeDetails.append(String.format("Nome alterado de '%s' para '%s'. ", product.getName(), data.getName()));
            product.setName(data.getName());
            changed = true;
        }
        if (!product.getPrice().equals(data.getPrice())) {
            changeDetails.append(String.format("Preço alterado de R$ %.2f para R$ %.2f. ", product.getPrice(), data.getPrice()));
            product.setPrice(data.getPrice());
            changed = true;
        }
        if (!product.getQuantity().equals(data.getQuantity())) {
            changeDetails.append(String.format("Estoque alterado de %d para %d. ", product.getQuantity(), data.getQuantity()));
            product.setQuantity(data.getQuantity());
            changed = true;
        }
        if (data.getDescription() != null && !data.getDescription().equals(product.getDescription())) {
            product.setDescription(data.getDescription());
        }
        if (data.getImage() != null && !data.getImage().equals(product.getImage())) {
            product.setImage(data.getImage());
        }

        Product updatedProduct = productRepository.save(product);

        if (changed) {
            // Record history
            ProductHistory history = ProductHistory.builder()
                    .productName(updatedProduct.getName())
                    .actionType("EDIT")
                    .quantityChange(updatedProduct.getQuantity() - oldQuantity)
                    .oldPrice(oldPrice)
                    .newPrice(updatedProduct.getPrice())
                    .timestamp(LocalDateTime.now())
                    .details(changeDetails.toString().trim())
                    .build();
            historyRepository.save(history);
        }

        return ResponseEntity.ok(new ProductResponseDTO(updatedProduct));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty() || !optionalProduct.get().getActive()) {
            return ResponseEntity.notFound().build();
        }

        Product product = optionalProduct.get();
        product.setActive(false);
        productRepository.save(product);

        // Record history
        ProductHistory history = ProductHistory.builder()
                .productName(product.getName())
                .actionType("DELETE")
                .quantityChange(-product.getQuantity())
                .oldPrice(product.getPrice())
                .newPrice(null)
                .timestamp(LocalDateTime.now())
                .details("Produto excluído do catálogo.")
                .build();
        historyRepository.save(history);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/sell")
    public ResponseEntity<?> sellProduct(@PathVariable Long id, @RequestBody SellRequestDTO data) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty() || !optionalProduct.get().getActive()) {
            return ResponseEntity.notFound().build();
        }

        Product product = optionalProduct.get();
        int soldQuantity = data.getQuantity();

        if (soldQuantity <= 0) {
            return ResponseEntity.badRequest().body("A quantidade vendida deve ser maior que zero.");
        }

        if (product.getQuantity() < soldQuantity) {
            return ResponseEntity.badRequest().body("Estoque insuficiente para realizar a venda.");
        }

        product.setQuantity(product.getQuantity() - soldQuantity);
        Product updatedProduct = productRepository.save(product);

        // Record history
        ProductHistory history = ProductHistory.builder()
                .productName(updatedProduct.getName())
                .actionType("SELL")
                .quantityChange(-soldQuantity)
                .oldPrice(updatedProduct.getPrice())
                .newPrice(updatedProduct.getPrice())
                .timestamp(LocalDateTime.now())
                .details(String.format("Venda realizada de %d unidade(s).", soldQuantity))
                .build();
        historyRepository.save(history);

        return ResponseEntity.ok(new ProductResponseDTO(updatedProduct));
    }
}
