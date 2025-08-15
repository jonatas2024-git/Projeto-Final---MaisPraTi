package com.maisprati.portaldevagas.infra.exceptions;

import com.maisprati.portaldevagas.infra.exceptions.error.ErrorResponse;
import com.maisprati.portaldevagas.infra.exceptions.error.ValidationErrorResponse;
import com.maisprati.portaldevagas.utils.Constants;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private String now() {
        return OffsetDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
    }

    @ExceptionHandler(AuthenticationException.class)//401-Credenciais inválidas
    public ResponseEntity<ErrorResponse> handleAuth(AuthenticationException ex, HttpServletRequest req) {
        var body = new ErrorResponse(ex.getMessage(), Constants.INV_CRED, req.getRequestURI(), now());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(body);
    }

    @ExceptionHandler(NotFoundException.class)//404-Recurso não encontrado
    public ResponseEntity<ErrorResponse> handleAuth(NotFoundException ex, HttpServletRequest req) {
        var body = new ErrorResponse(ex.getMessage(), Constants.RES_NOT_FOUND, req.getRequestURI(), now());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(BusinessException.class)// 422/400-Erros na regra de negócio
    public ResponseEntity<ErrorResponse> handleAuth(BusinessException ex, HttpServletRequest req) {
        var body = new ErrorResponse(ex.getMessage(), Constants.BUSINESS_RULE, req.getRequestURI(), now());
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(body);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)// 400-Validação de @Valid dos DTO's de entrada
    public ResponseEntity<ValidationErrorResponse> handleAuth(MethodArgumentNotValidException ex, HttpServletRequest req) {
        List<ValidationErrorResponse.FieldErrorItem> fields = ex.getBindingResult().getFieldErrors().stream()
                .map(f -> new ValidationErrorResponse.FieldErrorItem(f.getField(), f.getDefaultMessage()))
                .toList();

        var body = new ValidationErrorResponse(Constants.INVALID_REQ, Constants.VALID_ERROR, req.getRequestURI(), now(), fields);

        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(ConstraintViolationException.class)// 400-Validação de @Validated dos params/path
    public ResponseEntity<ValidationErrorResponse> handleAuth(ConstraintViolationException ex, HttpServletRequest req) {
        List<ValidationErrorResponse.FieldErrorItem> fields = ex.getConstraintViolations().stream()
                .map(cv -> new ValidationErrorResponse.FieldErrorItem(cv.getPropertyPath().toString(), cv.getMessage()))
                .toList();

        var body = new ValidationErrorResponse(Constants.INVALID_REQ, Constants.VALID_ERROR, req.getRequestURI(), now(), fields);

        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(Exception.class)// 500 Fallback
    public ResponseEntity<ErrorResponse> handleAuth(Exception ex, HttpServletRequest req) {
        var body = new ErrorResponse(Constants.SERV_INT_ERROR, Constants.INT_ERROR, req.getRequestURI(), now());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }

    @ExceptionHandler(UserValidationException.class)
    public ResponseEntity<ErrorResponse> handleUserValidation(UserValidationException ex, HttpServletRequest req) {
       var body = new ErrorResponse(Constants.USER_CADASTRADO, Constants.USER_EXISTS, req.getRequestURI(), now());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }
}
