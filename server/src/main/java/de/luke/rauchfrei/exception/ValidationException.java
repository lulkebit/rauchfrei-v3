package de.luke.rauchfrei.exception;

import java.util.Map;

public class ValidationException extends RuntimeException {
    private final Map<String, String> fieldErrors;

    public ValidationException(Map<String, String> fieldErrors) {
        this.fieldErrors = fieldErrors;
    }

    public Map<String, String> getFieldErrors() {
        return fieldErrors;
    }
} 