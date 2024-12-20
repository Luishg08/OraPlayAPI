CREATE OR REPLACE PROCEDURE VERIFICAR_USUARIO1(
    p_correo IN VARCHAR2,
    p_contraseña IN VARCHAR2,
    p_id OUT NUMBER
)
AS
BEGIN
    
    BEGIN
        -- Intentamos obtener el idUsuario con el correo y la contraseña proporcionados
        SELECT idUsuario
        INTO p_id
        FROM USUARIO
        WHERE correo = p_correo AND password = p_contraseña;
    
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            -- Si no se encuentra el usuario, p_id será -1
            p_id := -1;
        WHEN OTHERS THEN
            -- Si ocurre algún otro error, asignamos -1 a p_id 
            p_id := -1;
    END;
END;


CREATE OR REPLACE PACKAGE Pack_partidos AS
TYPE idspartidos IS TABLE OF NUMBER
INDEX BY BINARY_INTEGER;
V_idsCurso idspartidos;
PROCEDURE listar_en_curso(P_partidos OUT SYS_REFCURSOR);
PROCEDURE listar_pendientes(P_partidos OUT SYS_REFCURSOR);
END Pack_partidos;

-- Disparo que gestiona la creación de un usuario
CREATE OR REPLACE TRIGGER TRG_BEFORE_INSERT_USUARIO
BEFORE INSERT ON USUARIO
FOR EACH ROW
BEGIN
  -- Asignar valores predeterminados a los campos controlados automáticamente
  IF :NEW.ESTADO IS NULL THEN
    :NEW.ESTADO := 'A'; -- Estado por defecto "Activo"
  END IF;

  IF :NEW.FECHAREGISTRO IS NULL THEN
    :NEW.FECHAREGISTRO := SYSDATE; -- Fecha de registro como la fecha actual
  END IF;

  IF :NEW.ROLID IS NULL THEN
    :NEW.ROLID := 1; -- Rol predeterminado como 1
  END IF;
  
  IF :NEW.SALDO IS NULL THEN
    :NEW.SALDO := 0; -- Rol predeterminado como 1
  END IF;
END;
/

INSERT INTO USUARIO (CORREO, NOMBRE, APELLIDO, PASSWORD)
VALUES ('prueba@correo.com', 'Juan', 'Pérez', 'miPassword123');


CREATE OR REPLACE PACKAGE BODY Pack_partidos AS
    PROCEDURE listar_en_curso(P_partidos OUT SYS_REFCURSOR) AS
    BEGIN
        OPEN P_partidos FOR
        SELECT IDPARTIDO
        FROM PARTIDO 
        WHERE SYSDATE 
        BETWEEN TO_DATE(FECHAINICIO, 'YYYY-MM-DD HH24:MI:SS') 
            AND TO_DATE(FECHAFIN, 'YYYY-MM-DD HH24:MI:SS');
    END listar_en_curso;
 PROCEDURE listar_pendientes(P_partidos OUT SYS_REFCURSOR) AS
    BEGIN
        OPEN P_partidos FOR
        SELECT IDPARTIDO
        FROM PARTIDO 
        WHERE SYSDATE 
        <= TO_DATE(FECHAINICIO, 'YYYY-MM-DD HH24:MI:SS') 
        AND ESTADO  = 'PENDIENTE';
    END listar_pendientes;
END Pack_partidos;
/

CREATE OR REPLACE FUNCTION validar_usuario(id_usuario INT)
RETURN BOOLEAN
IS
    v_count INT;
BEGIN
    -- Realizar la consulta y almacenar el resultado en la variable
    SELECT COUNT(*) 
    INTO v_count
    FROM usuario 
    WHERE idUsuario = id_usuario AND estado = 'A';

    -- Verificar si el usuario existe y está activo
    IF v_count > 0 THEN
        RETURN TRUE;  -- El usuario existe y está activo
    ELSE
        RETURN FALSE;  -- El usuario no existe o no está activo
    END IF;
END;

