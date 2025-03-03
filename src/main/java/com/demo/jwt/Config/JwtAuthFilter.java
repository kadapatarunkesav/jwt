package com.demo.jwt.Config;


import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;



@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter{

    @Autowired
    private final JwtService jwtService;
    
    @Autowired
    private final UserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(
    @NonNull HttpServletRequest request, 
    @NonNull HttpServletResponse response, 
    @NonNull FilterChain filterChain)
            throws ServletException, IOException {
                final String authHeader = request.getHeader("Authorization");
                String jwt;
                String email; 
                if(authHeader == null || !authHeader.startsWith("Bearer ")){
                    filterChain.doFilter(request, response);
                    return ;
                }
            jwt=authHeader.substring(7);
            email=jwtService.extractUsername(jwt);
            if(email!=null && SecurityContextHolder.getContext().getAuthentication()==null){
                UserDetails userDetails=this.userDetailsService.loadUserByUsername(email);
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                    userDetails,null,userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(token);
        }
        filterChain.doFilter(request, response);
    }

    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) throws ServletException {
		return request.getServletPath().contains("/authenticate");
	}
}
