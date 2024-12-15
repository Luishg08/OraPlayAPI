CREATE OR REPLACE PACKAGE Pack_global AS
  Vid_ApuestaEvento NUMBER;
  Vid_ApuestaJugador NUMBER;
  Vid_ApuestaMarcador NUMBER;
  Vid_Contratacion NUMBER;
  Vid_Equipo NUMBER;
  Vid_Estadio NUMBER;
  Vid_Estadistica NUMBER;
  Vid_Evento NUMBER;
  Vid_Jugador NUMBER;
  Vid_MetodoPago NUMBER;
  Vid_Partido NUMBER;
  Vid_Rol NUMBER;
  Vid_Tecnico NUMBER;
  Vid_Torneo NUMBER;
  Vid_Transaccion NUMBER;
  Vid_Usuario NUMBER;
END Pack_global;
/

-- Manejo id para APUESTAEVENTO
CREATE OR REPLACE TRIGGER pk_sec_apuestaevento
BEFORE INSERT ON APUESTAEVENTO
BEGIN
    SELECT NVL(MAX(idApuestaEvento)+1,1)
    INTO Pack_global.Vid_ApuestaEvento
    FROM APUESTAEVENTO;
END pk_sec_apuestaevento;
/

CREATE OR REPLACE TRIGGER pk_sec_insert_apuestaevento
BEFORE INSERT ON APUESTAEVENTO
FOR EACH ROW
BEGIN
    :new.idApuestaEvento := Pack_global.Vid_ApuestaEvento;
    Pack_global.Vid_ApuestaEvento := Pack_global.Vid_ApuestaEvento + 1;
END pk_sec_insert_apuestaevento;
/
-- Manejo id para APUESTAJUGADOR
CREATE OR REPLACE TRIGGER pk_sec_apuestajugador
BEFORE INSERT ON APUESTAJUGADOR
BEGIN
    SELECT NVL(MAX(idApuestaJugador)+1,1)
    INTO Pack_global.Vid_ApuestaJugador
    FROM APUESTAJUGADOR;
END pk_sec_apuestajugador;
/

CREATE OR REPLACE TRIGGER pk_sec_insert_apuestajugador
BEFORE INSERT ON APUESTAJUGADOR
FOR EACH ROW
BEGIN
    :new.idApuestaJugador := Pack_global.Vid_ApuestaJugador;
    Pack_global.Vid_ApuestaJugador := Pack_global.Vid_ApuestaJugador + 1;
END pk_sec_insert_apuestajugador;
/
-- Manejo id para APUESTAMARCADOR
CREATE OR REPLACE TRIGGER pk_sec_apuestamarcador
BEFORE INSERT ON APUESTAMARCADOR
BEGIN
    SELECT NVL(MAX(idApuestaMarcador)+1,1)
    INTO Pack_global.Vid_ApuestaMarcador
    FROM APUESTAMARCADOR;
END pk_sec_apuestamarcador;
/

CREATE OR REPLACE TRIGGER pk_sec_insert_apuestamarcador
BEFORE INSERT ON APUESTAMARCADOR
FOR EACH ROW
BEGIN
    :new.idApuestaMarcador := Pack_global.Vid_ApuestaMarcador;
    Pack_global.Vid_ApuestaMarcador := Pack_global.Vid_ApuestaMarcador + 1;
END pk_sec_insert_apuestamarcador;
/
-- Manejo id para CONTRATACION
CREATE OR REPLACE TRIGGER pk_sec_contratacion
BEFORE INSERT ON CONTRATACION
BEGIN
    SELECT NVL(MAX(IdContrato)+1,1)
    INTO Pack_global.Vid_Contratacion
    FROM CONTRATACION;
END pk_sec_contratacion;
/

CREATE OR REPLACE TRIGGER pk_sec_insert_contratacion
BEFORE INSERT ON CONTRATACION
FOR EACH ROW
BEGIN
    :new.IdContrato := Pack_global.Vid_Contratacion;
    Pack_global.Vid_Contratacion := Pack_global.Vid_Contratacion + 1;
END pk_sec_insert_contratacion;
/
-- Manejo id para EQUIPO
CREATE OR REPLACE TRIGGER pk_sec_equipo
BEFORE INSERT ON EQUIPO
BEGIN
    SELECT NVL(MAX(idEquipo)+1,1)
    INTO Pack_global.Vid_Equipo
    FROM EQUIPO;
END pk_sec_equipo;
/

CREATE OR REPLACE TRIGGER pk_sec_insert_equipo
BEFORE INSERT ON EQUIPO
FOR EACH ROW
BEGIN
    :new.idEquipo := Pack_global.Vid_Equipo;
    Pack_global.Vid_Equipo := Pack_global.Vid_Equipo + 1;
END pk_sec_insert_equipo;
/
-- Manejo id para ESTADIO
CREATE OR REPLACE TRIGGER pk_sec_estadio
BEFORE INSERT ON ESTADIO
BEGIN
    SELECT NVL(MAX(idEstadio)+1,1)
    INTO Pack_global.Vid_Estadio
    FROM ESTADIO;
END pk_sec_estadio;
/

CREATE OR REPLACE TRIGGER pk_sec_insert_estadio
BEFORE INSERT ON ESTADIO
FOR EACH ROW
BEGIN
    :new.idEstadio := Pack_global.Vid_Estadio;
    Pack_global.Vid_Estadio := Pack_global.Vid_Estadio + 1;
END pk_sec_insert_estadio;
/
-- Manejo id para ESTADISTICA
CREATE OR REPLACE TRIGGER pk_sec_estadistica
BEFORE INSERT ON ESTADISTICA
BEGIN
    SELECT NVL(MAX(idEstadistica)+1,1)
    INTO Pack_global.Vid_Estadistica
    FROM ESTADISTICA;
END pk_sec_estadistica;
/

CREATE OR REPLACE TRIGGER pk_sec_insert_estadistica
BEFORE INSERT ON ESTADISTICA
FOR EACH ROW
BEGIN
    :new.idEstadistica := Pack_global.Vid_Estadistica;
    Pack_global.Vid_Estadistica := Pack_global.Vid_Estadistica + 1;
END pk_sec_insert_estadistica;
/
-- Manejo id para EVENTO
CREATE OR REPLACE TRIGGER pk_sec_evento
BEFORE INSERT ON EVENTO
BEGIN
    SELECT NVL(MAX(idEvento)+1,1)
    INTO Pack_global.Vid_Evento
    FROM EVENTO;
END pk_sec_evento;
/

CREATE OR REPLACE TRIGGER pk_sec_insert_evento
BEFORE INSERT ON EVENTO
FOR EACH ROW
BEGIN
    :new.idEvento := Pack_global.Vid_Evento;
    Pack_global.Vid_Evento := Pack_global.Vid_Evento + 1;
END pk_sec_insert_evento;
/
-- Manejo id para METODOPAGO
CREATE OR REPLACE TRIGGER pk_sec_metodopago
BEFORE INSERT ON METODOPAGO
BEGIN
    SELECT NVL(MAX(idMetodoPago)+1,1)
    INTO Pack_global.Vid_MetodoPago
    FROM METODOPAGO;
END pk_sec_metodopago;
/

CREATE OR REPLACE TRIGGER pk_sec_insert_metodopago
BEFORE INSERT ON METODOPAGO
FOR EACH ROW
BEGIN
    :new.idMetodoPago := Pack_global.Vid_MetodoPago;
    Pack_global.Vid_MetodoPago := Pack_global.Vid_MetodoPago + 1;
END pk_sec_insert_metodopago;
/
-- Manejo id para PARTIDO
CREATE OR REPLACE TRIGGER pk_sec_partido
BEFORE INSERT ON PARTIDO
BEGIN
    SELECT NVL(MAX(idPartido)+1,1)
    INTO Pack_global.Vid_Partido
    FROM PARTIDO;
END pk_sec_partido;
/

CREATE OR REPLACE TRIGGER pk_sec_insert_partido
BEFORE INSERT ON PARTIDO
FOR EACH ROW
BEGIN
    :new.idPartido := Pack_global.Vid_Partido;
    Pack_global.Vid_Partido := Pack_global.Vid_Partido + 1;
END pk_sec_insert_partido;
/
-- Manejo id para ROL
CREATE OR REPLACE TRIGGER pk_sec_rol
BEFORE INSERT ON ROL
BEGIN
    SELECT NVL(MAX(idRol)+1,1)
    INTO Pack_global.Vid_Rol
    FROM ROL;
END pk_sec_rol;
/
CREATE OR REPLACE TRIGGER pk_sec_insert_rol
BEFORE INSERT ON ROL
FOR EACH ROW
BEGIN
    :new.idRol := Pack_global.Vid_Rol;
    Pack_global.Vid_Rol := Pack_global.Vid_Rol + 1;
END pk_sec_insert_rol;
/
-- Manejo id para TECNICO
CREATE OR REPLACE TRIGGER pk_sec_tecnico
BEFORE INSERT ON TECNICO
BEGIN
    SELECT NVL(MAX(idTecnico)+1,1)
    INTO Pack_global.Vid_Tecnico
    FROM TECNICO;
END pk_sec_tecnico;
/

CREATE OR REPLACE TRIGGER pk_sec_insert_tecnico
BEFORE INSERT ON TECNICO
FOR EACH ROW
BEGIN
    :new.idTecnico := Pack_global.Vid_Tecnico;
    Pack_global.Vid_Tecnico := Pack_global.Vid_Tecnico + 1;
END pk_sec_insert_tecnico;
/
-- Manejo id para TORNEO
CREATE OR REPLACE TRIGGER pk_sec_torneo
BEFORE INSERT ON TORNEO
BEGIN
    SELECT NVL(MAX(idTorneo)+1,1)
    INTO Pack_global.Vid_Torneo
    FROM TORNEO;
END pk_sec_torneo;
/

CREATE OR REPLACE TRIGGER pk_sec_insert_torneo
BEFORE INSERT ON TORNEO
FOR EACH ROW
BEGIN
    :new.idTorneo := Pack_global.Vid_Torneo;
    Pack_global.Vid_Torneo := Pack_global.Vid_Torneo + 1;
END pk_sec_insert_torneo;
/
-- Manejo id para TRANSACCION
CREATE OR REPLACE TRIGGER pk_sec_transaccion
BEFORE INSERT ON TRANSACCION
BEGIN
    SELECT NVL(MAX(idTransaccion)+1,1)
    INTO Pack_global.Vid_Transaccion
    FROM TRANSACCION;
END pk_sec_transaccion;
/

CREATE OR REPLACE TRIGGER pk_sec_insert_transaccion
BEFORE INSERT ON TRANSACCION
FOR EACH ROW
BEGIN
    :new.idTransaccion := Pack_global.Vid_Transaccion;
    Pack_global.Vid_Transaccion := Pack_global.Vid_Transaccion + 1;
END pk_sec_insert_transaccion;
/
-- Manejo id para USUARIO
CREATE OR REPLACE TRIGGER pk_sec_usuario
BEFORE INSERT ON USUARIO
BEGIN
    SELECT NVL(MAX(idUsuario)+1,1)
    INTO Pack_global.Vid_Usuario
    FROM USUARIO;
END pk_sec_usuario;
/

CREATE OR REPLACE TRIGGER pk_sec_insert_usuario
BEFORE INSERT ON USUARIO
FOR EACH ROW
BEGIN
    :new.idUsuario := Pack_global.Vid_Usuario;
    Pack_global.Vid_Usuario := Pack_global.Vid_Usuario + 1;
END pk_sec_insert_usuario;
/
