package com.example.demo.controller;

import com.example.demo.model.Order;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/orders")
    public ResponseEntity<?> getUserOrders(@RequestParam String email) {
        List<Order> orders = orderRepository.findByUserEmail(email);
        Map<String, Object> resp = new HashMap<>();
        resp.put("orders", orders);
        return ResponseEntity.ok(resp);
    }
}
