package com.example.demo;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
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
	CommandLineRunner initUsers(UserRepository userRepository) {
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
		};
	}
}
