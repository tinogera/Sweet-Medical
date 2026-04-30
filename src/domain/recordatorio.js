class ServicioRecordatorios {

     // Este método lo llamaría el sistema una vez por día
     enviarRecordatoriosDelDia(todosLosTurnos) {

        //te da la fecha de el dia siguiente
         const mañana = new Date();
         mañana.setDate(mañana.getDate() + 1);

         // 1. Filtrar turnos que son MAÑANA y están RESERVADOS o CONFIRMADOS
         const turnosAnotificar = todosLosTurnos.filter(turno => {

            //toDateString sirve para comparar solo por el dia
             const esMañana = turno.fechaHora.toDateString() === mañana.toDateString();
             const estaActivo = turno.estaReservado() || turno.estaConfirmado();
             return esMañana && estaActivo;
         });

         // 2. Generar las notificaciones
         turnosAnotificar.forEach(turno => {
             const mensaje = `mañana tiene turno`
             // Notificar al paciente
             const notiPaciente = new Notificacion(turno.paciente ,mensaje);
             turno.paciente.recibirNotificacion(notiPaciente);

             // Notificar al médico
             const notiMedico = new Notificacion(turno.medico, mensaje);
             turno.medico.recibirNotificacion(notiMedico);
         });
     }
 }