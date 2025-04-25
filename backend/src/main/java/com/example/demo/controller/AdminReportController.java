package com.example.demo.controller;

import com.example.demo.model.Order;
import com.example.demo.model.Product;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/report")
@CrossOrigin(origins = "*")
public class AdminReportController {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/summary")
    public Map<String, Object> getSummary() {
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalOrders", orderRepository.count());
        summary.put("totalProducts", productRepository.count());
        summary.put("totalRevenue", orderRepository.findAll().stream().mapToDouble(o -> {
            Product p = productRepository.findAll().stream().filter(prod -> prod.getName().equals(o.getProduct())).findFirst().orElse(null);
            return p != null ? p.getPrice() * o.getQuantity() : 0;
        }).sum());
        return summary;
    }

    @GetMapping("/orders-per-product")
    public Map<String, Integer> getOrdersPerProduct() {
        Map<String, Integer> result = new HashMap<>();
        List<Order> orders = orderRepository.findAll();
        for (Order o : orders) {
            result.put(o.getProduct(), result.getOrDefault(o.getProduct(), 0) + o.getQuantity());
        }
        return result;
    }

    @GetMapping("/orders-per-status")
    public Map<String, Integer> getOrdersPerStatus() {
        Map<String, Integer> result = new HashMap<>();
        List<Order> orders = orderRepository.findAll();
        for (Order o : orders) {
            result.put(o.getStatus(), result.getOrDefault(o.getStatus(), 0) + 1);
        }
        return result;
    }
}
