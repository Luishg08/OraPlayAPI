CREATE OR REPLACE TRIGGER verificar_estado_usuario
BEFORE INSERT ON transaccion
FOR EACH ROW
DECLARE
    v_estado CHAR(1);
BEGIN
    -- Consultar el estado del usuario antes de la inserción usando la relación con la tabla 'metodopago'
    SELECT U.estado
    INTO v_estado
    FROM usuario U
    JOIN metodopago M ON M.usuarioid = U.idUsuario
    WHERE M.idmetodopago = :NEW.metodopagoid;  -- Usamos :NEW.metodopagoid para referirnos a la columna de la transacción

    -- Verificar si el estado del usuario es 'A' (activo)
    IF v_estado != 'A' THEN
        RAISE_APPLICATION_ERROR(-20001, 'El usuario no está activo. No se puede realizar la transacción.');
    END IF;
END;

CREATE OR REPLACE PROCEDURE retiro_saldo(
    p_usuario_id IN INT,           -- ID del usuario que realiza la transferencia
    p_monto     IN NUMBER,         -- Monto a transferir
    p_cuenta_banco_id IN INT,      -- ID de la cuenta bancaria a la que se transfiere el monto
    p_mensaje OUT VARCHAR2        -- Mensaje de confirmación o error
)
IS
    v_saldo_usuario   NUMBER(10, 2);  -- Variable para almacenar el saldo del usuario
BEGIN
    -- Verificar si el usuario existe
    BEGIN
        SELECT saldo
        INTO v_saldo_usuario
        FROM usuario
        WHERE idUsuario = p_usuario_id;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            p_mensaje := 'Usuario no encontrado.';
            RETURN; -- Termina la ejecución si no se encuentra el usuario
        WHEN OTHERS THEN
            p_mensaje := 'Error inesperado: ' || SQLERRM;
            RETURN; -- Termina la ejecución si ocurre un error inesperado
    END;

    -- Comprobar si el saldo es suficiente para la transferencia
    IF v_saldo_usuario < p_monto THEN
        p_mensaje := 'Saldo insuficiente para realizar la transferencia.';
        RETURN; -- Termina el procedimiento si el saldo es insuficiente
    END IF;

    -- Simular la transferencia: restar el monto de la cuenta del usuario
    UPDATE usuario
    SET saldo = saldo - p_monto
    WHERE idUsuario = p_usuario_id;


    -- Confirmación de la transferencia
    COMMIT;

    -- Mensaje de éxito
    p_mensaje := 'Transferencia realizada con éxito. Monto: ' || p_monto;

EXCEPTION
    WHEN OTHERS THEN
        -- Manejo de errores generales
        RAISE_APPLICATION_ERROR(-20003, 'Error en el proceso de transferencia: ' || SQLERRM);
END;


CREATE OR REPLACE TRIGGER verificar_tipo_transaccion
BEFORE INSERT ON transaccion
FOR EACH ROW
BEGIN
    -- Verificar que el tipo de transacción sea 'RETIRO' o 'RECARGA'
    IF :NEW.TIPO_TRANSACCION NOT IN ('RETIRO', 'RECARGA') THEN
        RAISE_APPLICATION_ERROR(-20001, 'El tipo de transacción debe ser "RETIRO" o "RECARGA".');
    END IF;
    
END;
/


CREATE OR REPLACE TRIGGER calcular_ganancia_jugador
BEFORE INSERT ON apuestajugador
FOR EACH ROW
DECLARE
    v_ganancia NUMBER(10, 2);  -- Variable para almacenar la ganancia calculada
BEGIN
    -- Generar un número aleatorio entre 0.1 y 0.8
    v_ganancia := DBMS_RANDOM.VALUE(0.1, 0.8);

    -- Actualizar la ganancia del jugador utilizando la cantidad apostada y la ganancia aleatoria
    :NEW.posibleganancia := :NEW.cantidadapostada * v_ganancia;

    -- Mostrar la ganancia calculada
    DBMS_OUTPUT.PUT_LINE('Ganancia calculada para el usuario ' || :NEW.usuarioid || ' es: ' || :NEW.posibleganancia);
    
EXCEPTION
    WHEN OTHERS THEN
        -- Manejo de errores
        RAISE_APPLICATION_ERROR(-20001, 'Error al calcular la ganancia: ' || SQLERRM);
END;
/


CREATE OR REPLACE TRIGGER calcular_ganancia_evento
BEFORE INSERT ON apuestaevento
FOR EACH ROW
DECLARE
    v_ganancia NUMBER(10, 2);  -- Variable para almacenar la ganancia calculada
BEGIN
    -- Generar un número aleatorio entre 0.1 y 0.8
    v_ganancia := DBMS_RANDOM.VALUE(0.1, 0.8);

    -- Actualizar la ganancia del jugador utilizando la cantidad apostada y la ganancia aleatoria
    :NEW.posibleganancia := :NEW.cantidadapostada * v_ganancia;

    -- Mostrar la ganancia calculada
    DBMS_OUTPUT.PUT_LINE('Ganancia calculada para el usuario ' || :NEW.usuarioid || ' es: ' || :NEW.posibleganancia);
    
EXCEPTION
    WHEN OTHERS THEN
        -- Manejo de errores
        RAISE_APPLICATION_ERROR(-20001, 'Error al calcular la ganancia: ' || SQLERRM);
END;
/



CREATE OR REPLACE TRIGGER calcular_ganancia_marcador
BEFORE INSERT ON apuestamarcador
FOR EACH ROW
DECLARE
    v_ganancia NUMBER(10, 2);  -- Variable para almacenar la ganancia calculada
BEGIN
    -- Generar un número aleatorio entre 0.1 y 0.8
    v_ganancia := DBMS_RANDOM.VALUE(0.1, 0.8);

    -- Actualizar la ganancia del jugador utilizando la cantidad apostada y la ganancia aleatoria
    :NEW.posibleganancia := :NEW.cantidadapostada * v_ganancia;

    -- Mostrar la ganancia calculada
    DBMS_OUTPUT.PUT_LINE('Ganancia calculada para el usuario ' || :NEW.usuarioid || ' es: ' || :NEW.posibleganancia);
    
EXCEPTION
    WHEN OTHERS THEN
        -- Manejo de errores
        RAISE_APPLICATION_ERROR(-20001, 'Error al calcular la ganancia: ' || SQLERRM);
END;
/


