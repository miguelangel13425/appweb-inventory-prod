from django.db import models

class RoleChoices(models.TextChoices):
    ADMIN = 'ADMIN', 'Administrador'
    EMPLOYEE = 'EMPLOYEE', 'Empleado'
    VIEWER = 'VIEWER', 'Vista'

class GenderChoices(models.TextChoices):
    MALE = 'M', 'Hombre'
    FEMALE = 'F', 'Mujer'
    OTHER = 'O', 'Otro'

class DegreeChoices(models.TextChoices):
    ARC = 'Architecture', 'Arquitectura'
    ADM = 'B.A. in Administration', 'Licenciatura en Administración'
    ACC = 'Public Accountant', 'Contador Público'
    ENV = 'Environmental Engineering', 'Ingeniería Ambiental'
    BIOM = 'Biomedical Engineering', 'Ingeniería Biomedica'
    CIV = 'Civil Engineering', 'Ingeniería Civil'
    IND = 'Industrial Design Eng.', 'Ingeniería de Diseno Industrial'
    ELEC = 'Electronics Engineering', 'Ingeniería Electromecânica'
    BME = 'Business Management Engineering', 'Ingeniería de Negocios'
    LOG = 'Logistics Engineering', 'Ingeniería Logística'
    NAN = 'Nanotechnology Engineering', 'Ingeniería Nanotécnica'
    CHEM = 'Chemical Engineering', 'Ingeniería Química'
    AER = 'Aeronautical Engineering', 'Ingeniería Aeronaúutica'
    BIOC = 'Biochemical Engineering', 'Ingeniería Bioquímica'
    EME = 'Electromechanical Engineering', 'Ingeniería Electromecánica'
    CPE = 'Computer Engineering', 'Ingeniería de Computación'
    CSE = 'Computer Systems Engineering', 'Ingeniería de Sistemas de Computación'
    ITC = 'Information Technology and Communications Engineering', 'Ingeniería de Telecomunicaciones y de la Información'
    CYB = 'Cybersecurity Engineering', 'Ingeniería de Seguridad Informática'
    AIE = 'Artificial Intelligence Engineering', 'Ingeniería de la Inteligencia Artificial'
    IIE = 'Industrial Engineering', 'Ingeniería Industrial'
    MEC = 'Mechanical Engineering', 'Ingeniería Mecânica'