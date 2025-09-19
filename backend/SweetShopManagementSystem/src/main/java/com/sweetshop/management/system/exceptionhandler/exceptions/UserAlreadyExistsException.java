package com.sweetshop.management.system.exceptionhandler.exceptions;

public class UserAlreadyExistsException extends RuntimeException{
    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
