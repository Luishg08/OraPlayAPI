CREATE OR REPLACE PROCEDURE genera_aleatorio
(P_partidoID IN NUMBER)
AS
Vnumeroal NUMBER;
Vlimite1 NUMBER:=1;
Vlimite2 NUMBER:=30;
VidEquipoLocal NUMBER;
VidEquipoVisitante NUMBER;
VminutoActual NUMBER:=50;
VnombreEquipo VARCHAR2(120);
BEGIN
    -- Obtener el minuto actual
    SELECT ROUND((SYSDATE - TO_DATE(FECHAINICIO, 'YYYY-MM-DD HH24:MI:SS')) * 24 * 60)
    INTO VminutoActual
    FROM PARTIDO
    WHERE IDPARTIDO = P_partidoID;
    
    IF VminutoActual > 45 THEN
        VminutoActual:=VminutoActual-15;
    END IF;
    -- Obtener id de equipolocal y equipovisitante
    SELECT EQUIPOLOCALID, EQUIPOVISITANTEID 
    INTO VidEquipoLocal, VidEquipoVisitante
    FROM PARTIDO WHERE IDPARTIDO = P_partidoID; 
    -- Generar un n�mero aleatorio del 1 al 50
   Vnumeroal:= ROUND(DBMS_RANDOM.VALUE(Vlimite1, Vlimite2),0);
    -- Evaluar casos espec�ficos para generar un evento aleatorio en el partido
    CASE Vnumeroal --Checkear el n�mero
    WHEN 1 THEN
        UPDATE PARTIDO SET GOLESEQUIPOLOCAL = GOLESEQUIPOLOCAL+1 WHERE IDPARTIDO = P_partidoID;
        genera_estadistica_aleatoria(VidEquipoLocal, P_partidoID);
    WHEN 2 THEN
        UPDATE PARTIDO SET GOLESEQUIPOVISITANTE = GOLESEQUIPOVISITANTE+1 WHERE IDPARTIDO = P_partidoID;
        genera_estadistica_aleatoria(VidEquipoLocal, P_partidoID);
    WHEN 3 THEN
        INSERT INTO EVENTO(TIPOEVENTO, MINUTO, PARTIDOID, EQUIPOID) VALUES ('PENALTI', VminutoActual, P_partidoID, VidEquipoLocal);
    WHEN 4 THEN
        INSERT INTO EVENTO(TIPOEVENTO, MINUTO, PARTIDOID, EQUIPOID) VALUES ('PENALTI', VminutoActual, P_partidoID, VidEquipoVisitante);
    WHEN 5 THEN
        INSERT INTO EVENTO(TIPOEVENTO, MINUTO, PARTIDOID, EQUIPOID) VALUES ('GOL ANULADO', VminutoActual, P_partidoID, VidEquipoLocal);
    WHEN 6 THEN
        INSERT INTO EVENTO(TIPOEVENTO, MINUTO, PARTIDOID, EQUIPOID) VALUES ('GOL ANULADO', VminutoActual, P_partidoID, VidEquipoVisitante);
    WHEN 7 THEN
        INSERT INTO EVENTO(TIPOEVENTO, MINUTO, PARTIDOID, EQUIPOID) VALUES ('TARJETA ROJA', VminutoActual, P_partidoID, VidEquipoLocal);
    WHEN 8 THEN
        INSERT INTO EVENTO(TIPOEVENTO, MINUTO, PARTIDOID, EQUIPOID) VALUES ('TARJETA ROJA', VminutoActual, P_partidoID, VidEquipoVisitante);
     WHEN 9 THEN
        INSERT INTO EVENTO(TIPOEVENTO, MINUTO, PARTIDOID, EQUIPOID) VALUES ('TIRO LIBRE', VminutoActual, P_partidoID, VidEquipoLocal);
    WHEN 10 THEN
        INSERT INTO EVENTO(TIPOEVENTO, MINUTO, PARTIDOID, EQUIPOID) VALUES ('TIRO LIBRE', VminutoActual, P_partidoID, VidEquipoVisitante);
    WHEN 11 THEN
        INSERT INTO EVENTO(TIPOEVENTO, MINUTO, PARTIDOID, EQUIPOID) VALUES ('TIRO DE ESQUINA', VminutoActual, P_partidoID, VidEquipoLocal);
    WHEN 12 THEN
        INSERT INTO EVENTO(TIPOEVENTO, MINUTO, PARTIDOID, EQUIPOID) VALUES ('TIRO DE ESQUINA', VminutoActual, P_partidoID, VidEquipoVisitante);
    WHEN 13 THEN
        INSERT INTO EVENTO(TIPOEVENTO, MINUTO, PARTIDOID, EQUIPOID) VALUES ('FUERA DE LUGAR', VminutoActual, P_partidoID, VidEquipoLocal);
    WHEN 14 THEN
        INSERT INTO EVENTO(TIPOEVENTO, MINUTO, PARTIDOID, EQUIPOID) VALUES ('FUERA DE LUGAR', VminutoActual, P_partidoID, VidEquipoVisitante);
     WHEN 15 THEN
        INSERT INTO EVENTO(TIPOEVENTO, MINUTO, PARTIDOID, EQUIPOID) VALUES ('AUTOGOL', VminutoActual, P_partidoID, VidEquipoLocal);
        UPDATE PARTIDO SET GOLESEQUIPOVISITANTE = GOLESEQUIPOVISITANTE+1 WHERE IDPARTIDO = P_partidoID;
    WHEN 16 THEN
        INSERT INTO EVENTO(TIPOEVENTO, MINUTO, PARTIDOID, EQUIPOID) VALUES ('AUTOGOL', VminutoActual, P_partidoID, VidEquipoVisitante);
        UPDATE PARTIDO SET GOLESEQUIPOLOCAL = GOLESEQUIPOLOCAL+1 WHERE IDPARTIDO = P_partidoID;
    WHEN 17 THEN
        INSERT INTO EVENTO(TIPOEVENTO, MINUTO, PARTIDOID, EQUIPOID) VALUES ('INTERVENCI�N DE AFICIONADOS', VminutoActual, P_partidoID, VidEquipoLocal);
    WHEN 18 THEN
        INSERT INTO EVENTO(TIPOEVENTO, MINUTO, PARTIDOID, EQUIPOID) VALUES ('LESI�N', VminutoActual, P_partidoID, VidEquipoLocal);
    WHEN 19 THEN
        INSERT INTO EVENTO(TIPOEVENTO, MINUTO, PARTIDOID, EQUIPOID) VALUES ('LESI�N', VminutoActual, P_partidoID, VidEquipoVisitante);
    ELSE
        DBMS_OUTPUT.PUT_LINE('�JUEGUE! JUEGUE! �JUEGUE!');
    END CASE;
END genera_aleatorio;

CREATE OR REPLACE PROCEDURE genera_estadistica_aleatoria(P_idEquipo IN NUMBER, P_idPartido IN NUMBER) 
AS
VidJugadorAleatorio NUMBER;
Vlimite1 NUMBER;
Vlimite2 NUMBER;
Vcontador NUMBER :=1;
VnombreJugador VARCHAR2(120);
VinsertUpdate NUMBER;
CURSOR MIC IS 
                SELECT IDJUGADOR
                FROM(
                SELECT  IDJUGADOR  FROM
                CONTRATACION WHERE FECHAFIN >=  SYSDATE AND IDEQUIPO = P_idEquipo
                ORDER BY DBMS_RANDOM.VALUE)
                WHERE ROWNUM IN (1,2);
BEGIN
    FOR I IN MIC LOOP
        SELECT COUNT(*)
        INTO VinsertUpdate
        FROM ESTADISTICA
        WHERE I.IDJUGADOR = I.IDJUGADOR AND PARTIDOID = P_idPartido;
        IF Vcontador = 1 THEN
            IF VinsertUpdate=0 THEN
                INSERT INTO ESTADISTICA(GOLES, ASISTENCIAS, PARTIDOID, JUGADORID)
                VALUES (0,1,P_idPartido, I.IDJUGADOR); -- Se crea estad�sitca para jugador en ese partido con una asistencia
            ELSE 
                UPDATE ESTADISTICA
                SET ASISTENCIAS = ASISTENCIAS+1
                WHERE PARTIDOID = P_idPartido AND JUGADORID = i.IDJUGADOR; -- Se adiciona a estad�stica ya existente una asistencia para el jugador en ese partido
            END IF;
        ELSE
             IF VinsertUpdate=0 THEN
                INSERT INTO ESTADISTICA(GOLES, ASISTENCIAS, PARTIDOID, JUGADORID)
                VALUES (1,0,P_idPartido, I.IDJUGADOR); -- Se crea estad�sitca para jugador en ese partido con un gol
                VidJugadorAleatorio:=I.IDJUGADOR;
            ELSE 
                UPDATE ESTADISTICA
                SET GOLES = GOLES+1
                WHERE PARTIDOID = P_idPartido AND JUGADORID = I.IDJUGADOR; -- Se adiciona a estad�stica ya existente un gol para el jugador en ese partido
                UPDATE JUGADOR SET GOLESTOTALES = GOLESTOTALES+1 WHERE IDJUGADOR = I.IDJUGADOR;
                UPDATE  CONTRATACION 
                SET CANTIDADGOLES = CANTIDADGOLES+1
                WHERE FECHAFIN >=  SYSDATE AND IDJUGADOR= I.IDJUGADOR; 
                 VidJugadorAleatorio:=I.IDJUGADOR;
            END IF;
        END IF;
        Vcontador:= Vcontador+1;
    END LOOP;
END genera_estadistica_aleatoria;

CREATE OR REPLACE PROCEDURE job_partidos
AS
resultado VARCHAR2(200); 
CURSOR MIC IS
    SELECT IDPARTIDO, ESTADO
    FROM PARTIDO 
    WHERE SYSDATE 
    BETWEEN TO_DATE(FECHAINICIO, 'YYYY-MM-DD HH24:MI:SS') AND 
    TO_DATE(FECHAFIN, 'YYYY-MM-DD HH24:MI:SS');
BEGIN
    FOR I IN MIC LOOP
         IF I.ESTADO = 'PENDIENTE' THEN
            UPDATE PARTIDO SET ESTADO = 'EN CURSO' WHERE IDPARTIDO = I.IDPARTIDO;
         END IF;
        genera_aleatorio(I.IDPARTIDO);
    END LOOP;
END;

-- Job que asigna estado FINALIZADO a partidos ya finalizados
CREATE OR REPLACE PROCEDURE job_finalizar AS
    CURSOR MIC IS 
                            SELECT IDPARTIDO, GOLESEQUIPOLOCAL, GOLESEQUIPOVISITANTE
                            FROM PARTIDO
                            WHERE SYSDATE >= TO_DATE(FECHAFIN, 'YYYY-MM-DD HH24:MI:SS') 
                             AND ESTADO != 'FINALIZADO';
    BEGIN
        FOR I IN MIC LOOP
            UPDATE PARTIDO SET ESTADO = 'FINALIZADO' WHERE IDPARTIDO = I.IDPARTIDO;
            IF I.GOLESEQUIPOLOCAL = I.GOLESEQUIPOVISITANTE THEN
                UPDATE PARTIDO SET EMPATE = 'Y' WHERE IDPARTIDO = I.IDPARTIDO;
            END IF;
        END LOOP;
END job_finalizar;

--Job que otorgar� ganancias a los usuarios que ganaron 
CREATE OR REPLACE PROCEDURE entrega_ganancias AS
    CURSOR MIC1 IS
        SELECT AP.USUARIOID, AP.POSIBLEGANANCIA, AP.PARTIDOID 
        FROM APUESTAMARCADOR AP
        INNER JOIN PARTIDO P ON AP.PARTIDOID = P.IDPARTIDO
        WHERE P.GOLESEQUIPOVISITANTE = AP.GOLESEQUIPOVISITANTE 
          AND P.GOLESEQUIPOLOCAL = AP.GOLESEQUIPOLOCAL
          AND P.ESTADO = 'FINALIZADO';

    CURSOR MIC2 IS
        SELECT AJ.USUARIOID, AJ.POSIBLEGANANCIA, AJ.PARTIDOID 
        FROM APUESTAJUGADOR AJ
        INNER JOIN PARTIDO P ON AJ.PARTIDOID = P.IDPARTIDO
        INNER JOIN ESTADISTICA E ON P.IDPARTIDO = E.PARTIDOID
        WHERE E.JUGADORID = AJ.JUGADORID 
          AND (E.GOLES = AJ.GOLES OR E.ASISTENCIAS = AJ.ASISTENCIAS) 
          AND P.ESTADO = 'FINALIZADO';

    CURSOR MIC3 IS
        SELECT AE.USUARIOID, AE.POSIBLEGANANCIA, AE.PARTIDOID 
        FROM APUESTAEVENTO AE
        INNER JOIN EVENTO E ON E.PARTIDOID = AE.PARTIDOID
        INNER JOIN PARTIDO P ON AE.PARTIDOID = P.IDPARTIDO
        WHERE E.TIPOEVENTO = AE.NOMBREEVENTO 
          AND E.EQUIPOID = AE.EQUIPOID
          AND P.ESTADO = 'FINALIZADO';

    -- Variables intermedias para almacenar valores del cursor
    V_USUARIOID NUMBER;
    V_POSIBLEGANANCIA NUMBER;
    V_PARTIDOID NUMBER;
BEGIN
    -- Primer cursor
    FOR I IN MIC1 LOOP
        V_USUARIOID := I.USUARIOID;
        V_POSIBLEGANANCIA := I.POSIBLEGANANCIA;
        V_PARTIDOID := I.PARTIDOID;

        UPDATE USUARIO
        SET SALDO = SALDO + V_POSIBLEGANANCIA
        WHERE IDUSUARIO = V_USUARIOID;

        UPDATE PARTIDO
        SET ESTADO = 'FINALIZADO PAGADO'
        WHERE IDPARTIDO = V_PARTIDOID;
    END LOOP;

    -- Segundo cursor
    FOR J IN MIC2 LOOP
        V_USUARIOID := J.USUARIOID;
        V_POSIBLEGANANCIA := J.POSIBLEGANANCIA;
        V_PARTIDOID := J.PARTIDOID;

        UPDATE USUARIO
        SET SALDO = SALDO + V_POSIBLEGANANCIA
        WHERE IDUSUARIO = V_USUARIOID;

        UPDATE PARTIDO
        SET ESTADO = 'FINALIZADO PAGADO'
        WHERE IDPARTIDO = V_PARTIDOID;
    END LOOP;

    -- Tercer cursor
    FOR K IN MIC3 LOOP
        V_USUARIOID := K.USUARIOID;
        V_POSIBLEGANANCIA := K.POSIBLEGANANCIA;
        V_PARTIDOID := K.PARTIDOID;

        UPDATE USUARIO
        SET SALDO = SALDO + V_POSIBLEGANANCIA
        WHERE IDUSUARIO = V_USUARIOID;

        UPDATE PARTIDO
        SET ESTADO = 'FINALIZADO PAGADO'
        WHERE IDPARTIDO = V_PARTIDOID;
    END LOOP;
END;
/


