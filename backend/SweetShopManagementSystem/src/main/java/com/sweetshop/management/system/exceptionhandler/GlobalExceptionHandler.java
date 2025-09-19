package com.sweetshop.management.system.exceptionhandler;

import com.sweetshop.management.system.dto.ErrorResponse;
import com.sweetshop.management.system.exceptionhandler.exceptions.InvalidCredentialsException;
import com.sweetshop.management.system.exceptionhandler.exceptions.UserAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExissteException(UserAlreadyExistsException userAlreadyExistsException){
        ErrorResponse errorResponse= ErrorResponse.builder()
                .message(userAlreadyExistsException.getMessage())
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .build();
        return new ResponseEntity<>(errorResponse,HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleInvalidCredentialsException(InvalidCredentialsException invalidCredentialsException){
        ErrorResponse errorResponse= ErrorResponse.builder()
                .message(invalidCredentialsException.getMessage())
                .statusCode(HttpStatus.NOT_FOUND.value())
                .build();
        return new ResponseEntity<>(errorResponse,HttpStatus.NOT_FOUND);
    }
}
