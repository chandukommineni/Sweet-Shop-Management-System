package com.sweetshop.management.system.exceptionhandler.exceptions;

public class InvalidCredentialsException extends RuntimeException{
    public InvalidCredentialsException(String message) {
        super(message);
    }
}
