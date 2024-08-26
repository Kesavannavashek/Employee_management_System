package com.Employee_Management_Sysytem.Employee.management.System.JWT;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        String username = null;
        String jwtToken = null;

        if (header != null && header.startsWith("Bearer ")) {
            jwtToken = header.substring(7);
            System.out.println(jwtToken);
            try {
                username = jwtUtil.getUserName(jwtToken);
                System.out.println(username);
            } catch (Exception e) {
                logger.error("Token extraction failed", e);
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (jwtUtil.isValidToken(username, jwtToken)) {

                String role = jwtUtil.extractRole(jwtToken);
                System.out.println("role   :"+role);
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.toUpperCase());
                System.out.println(authority);
                Authentication authentication = new UsernamePasswordAuthenticationToken(
                        username, null, List.of(authority));
                System.out.println(authentication);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println(SecurityContextHolder.getContext().getAuthentication());
            }
        }
        filterChain.doFilter(request, response);
    }
}
