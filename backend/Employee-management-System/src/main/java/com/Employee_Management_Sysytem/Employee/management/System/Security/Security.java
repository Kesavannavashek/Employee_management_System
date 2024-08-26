package com.Employee_Management_Sysytem.Employee.management.System.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.Employee_Management_Sysytem.Employee.management.System.JWT.JwtFilter;

@Configuration
@EnableWebSecurity
public class Security {

    private final JwtFilter jwtFilter;

    public Security(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF protection (only for non-browser clients)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/manager/**").hasAuthority("MANAGER")
                .requestMatchers("/Tl/**").hasAuthority("TL")
                .requestMatchers("/member/**").hasAuthority("MEMBER")
                .anyRequest().permitAll() // Require authentication for any other request 
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class); // Add JwtFilter before the UsernamePasswordAuthenticationFilter
        
        return http.build();
    }
}
