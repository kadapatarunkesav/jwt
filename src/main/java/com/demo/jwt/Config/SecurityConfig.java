package com.demo.jwt.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

        private final AuthenticationProvider authenticationProvider;

        private final JwtAuthFilter authFilter;

        @Bean
        SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

                return httpSecurity
                                .csrf(AbstractHttpConfigurer::disable)
                                .cors().and().headers().disable()
                                // .headers(headers -> headers.disable())
                                // .cors(cors -> cors.disable())
                                .authorizeHttpRequests(req -> req.requestMatchers("authenticate/*").permitAll()
                                                .anyRequest().authenticated())
                                .sessionManagement(
                                                sessionManagement -> sessionManagement
                                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authenticationProvider(authenticationProvider)
                                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
                                .build();
        }
}