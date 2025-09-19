package com.sweetshop.management.system.exceptionhandler.exceptions;

public class SweetNotFoundException extends RuntimeException{
    public SweetNotFoundException(String message) {
        super(message);
    }
}
