import re
from rest_framework import serializers

def validate_length(value, max_length):
    if len(value) > max_length:
        raise serializers.ValidationError(f'El campo no puede tener más de {max_length} caracteres')
    return value

def remove_spaces(value):
    return value.strip()

def validate_no_start_num_or_special(value):
    if re.match(r'^[0-9\.\,/]', value):
        raise serializers.ValidationError('El campo no puede iniciar con un número o un carácter especial')
    return value

def validate_min_value(value, min_value):
    if value < min_value:
        raise serializers.ValidationError(f'El valor no puede ser menor que {min_value}')
    return value

def validate_max_value(value, max_value):
    if value > max_value:
        raise serializers.ValidationError(f'El valor no puede ser mayor que {max_value}')
    return value

def validate_email(value):
    if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', value):
        raise serializers.ValidationError('El correo electrónico no es válido')
    return value

def validate_digits(value):
    if not re.match(r'^\d+$', value):
        raise serializers.ValidationError('El campo debe contener solo números')
    return value

def validate_phone_number(value):
    if not re.match(r'^\+?1?\d{9,15}$', value):
        raise serializers.ValidationError('El número de teléfono no es válido')
    return value

def validate_control_number(value):
    if not re.match(r'^[BCD]?\d{8}$', value):
        raise serializers.ValidationError('El número de control no es válido.')
    return value

def validate_rfc(value):
    if not re.match(r'^[A-Z&Ñ]{3,4}\d{6}[A-Z\d]{3}$', value, re.IGNORECASE):
        raise serializers.ValidationError('El RFC no es válido. Debe seguir el formato estándar.')
    return value