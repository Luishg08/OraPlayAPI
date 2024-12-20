CREATE OR REPLACE PROCEDURE VERIFICAR_USUARIO1(
    p_correo IN VARCHAR2,
    p_contrase�a IN VARCHAR2,
    p_id OUT NUMBER
)
AS
BEGIN
    
    BEGIN
        -- Intentamos obtener el idUsuario con el correo y la contrase�a proporcionados
        SELECT idUsuario
        INTO p_id
        FROM USUARIO
        WHERE correo = p_correo AND password = p_contrase�a;
    
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            -- Si no se encuentra el usuario, p_id ser� -1
            p_id := -1;
        WHEN OTHERS THEN
            -- Si ocurre alg�n otro error, asignamos -1 a p_id 
            p_id := -1;
    END;
END;

INSERT INTO APUESTAEVENTO (IDAPUESTAEVENTO, CANTIDADAPOSTADA, POSIBLEGANANCIA, USUARIOID, PARTIDOID, EVENTOID, EQUIPOID)
VALUES (1, 1000, 2000, 1, 1, 1, 1);

INSERT INTO APUESTAEVENTO (IDAPUESTAEVENTO, CANTIDADAPOSTADA, POSIBLEGANANCIA, USUARIOID, PARTIDOID, EVENTOID, EQUIPOID)
VALUES (2, 2000, 4000, 2, 2, 2, 2);

INSERT INTO APUESTAEVENTO (IDAPUESTAEVENTO, CANTIDADAPOSTADA, POSIBLEGANANCIA, USUARIOID, PARTIDOID, EVENTOID, EQUIPOID)
VALUES (3, 3000, 6000, 1, 1, 3, 3);
INSERT INTO APUESTAJUGADOR (IDAPUESTAJUGADOR, GOLES, ASISTENCIAS, CANTIDADAPOSTADA, POSIBLEGANANCIA, USUARIOID, PARTIDOID, JUGADORID)
VALUES (1, 1, 1, 1, 1, 1, 3, 3);

INSERT INTO APUESTAJUGADOR (IDAPUESTAJUGADOR, GOLES, ASISTENCIAS, CANTIDADAPOSTADA, POSIBLEGANANCIA, USUARIOID, PARTIDOID, JUGADORID)
VALUES (2, 2, 2, 2000, 4000, 1, 3, 3);

INSERT INTO APUESTAJUGADOR (IDAPUESTAJUGADOR, GOLES, ASISTENCIAS, CANTIDADAPOSTADA, POSIBLEGANANCIA, USUARIOID, PARTIDOID, JUGADORID)
VALUES (3, 3, 3, 3000, 6000, 3, 3, 3);
INSERT INTO APUESTAMARCADOR (IDAPUESTAMARCADOR, GOLESEQUIPOLOCAL, GOLESEQUIPOVISITANTE, CANTIDADAPOSTADA, POSIBLEGANANCIA, USUARIOID, PARTIDOID)
VALUES (1, 1, 0, 1000, 2000, 1, 1);

INSERT INTO APUESTAMARCADOR (IDAPUESTAMARCADOR, GOLESEQUIPOLOCAL, GOLESEQUIPOVISITANTE, CANTIDADAPOSTADA, POSIBLEGANANCIA, USUARIOID, PARTIDOID)
VALUES (2, 2, 1, 2000, 4000, 2, 2);

INSERT INTO APUESTAMARCADOR (IDAPUESTAMARCADOR, GOLESEQUIPOLOCAL, GOLESEQUIPOVISITANTE, CANTIDADAPOSTADA, POSIBLEGANANCIA, USUARIOID, PARTIDOID)
VALUES (3, 3, 2, 3000, 6000, 3, 3);