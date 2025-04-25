package com.example.demo;

import com.example.demo.model.User;
import com.example.demo.model.Product;
import com.example.demo.model.Order;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	CommandLineRunner initData(UserRepository userRepository, ProductRepository productRepository, OrderRepository orderRepository) {
		return args -> {
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			if (userRepository.findByEmail("admin@example.com").isEmpty()) {
				User admin = new User();
				admin.setName("Admin");
				admin.setEmail("admin@example.com");
				admin.setPassword(encoder.encode("adminpass"));
				admin.setRole("admin");
				userRepository.save(admin);
			}
			if (userRepository.findByEmail("alice@example.com").isEmpty()) {
				User user1 = new User();
				user1.setName("Alice");
				user1.setEmail("alice@example.com");
				user1.setPassword(encoder.encode("password123"));
				user1.setRole("user");
				userRepository.save(user1);
			}
			if (userRepository.findByEmail("bob@example.com").isEmpty()) {
				User user2 = new User();
				user2.setName("Bob");
				user2.setEmail("bob@example.com");
				user2.setPassword(encoder.encode("password456"));
				user2.setRole("user");
				userRepository.save(user2);
			}

			// Add demo products
			if (productRepository.count() == 0) {
				Product p1 = new Product();
				p1.setName("iPhone 15 Pro");
				p1.setPrice(129999);
				p1.setStock(15);
				productRepository.save(p1);
				Product p2 = new Product();
				p2.setName("Samsung Galaxy S24");
				p2.setPrice(99999);
				p2.setStock(20);
				productRepository.save(p2);
				Product p3 = new Product();
				p3.setName("Dell XPS 13 Laptop");
				p3.setPrice(89999);
				p3.setStock(8);
				productRepository.save(p3);
			}

			// Add demo orders
			if (orderRepository.count() == 0) {
				Order o1 = new Order();
				o1.setProduct("iPhone 15 Pro");
				o1.setQuantity(1);
				o1.setStatus("Delivered");
				o1.setUserEmail("alice@example.com");
				orderRepository.save(o1);
				Order o2 = new Order();
				o2.setProduct("Samsung Galaxy S24");
				o2.setQuantity(2);
				o2.setStatus("Shipped");
				o2.setUserEmail("bob@example.com");
				orderRepository.save(o2);
			}
		};
	}
}
