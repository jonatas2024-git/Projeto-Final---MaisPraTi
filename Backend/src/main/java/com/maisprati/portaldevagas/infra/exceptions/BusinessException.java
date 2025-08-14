package com.maisprati.portaldevagas.infra.exceptions;

public class BusinessException extends RuntimeException{
    public BusinessException (String message){
        super(message);
    }
}
