/* declarando un array de valor false que representarán los asientos que estan vacíos */
var airlineSeats = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false
]
// contador que rastreará el numero de asientos ocupados
var busySeats = 0;
var paintSeats = function(array) {
  var containerSeats = document.getElementById('seats');

  for (var i = 0; i < airlineSeats.length; i++) {
    var seat = document.createElement('div');
    seat.className = 'seats';
    // del primer elemento al cuarto en nuestro array(i=0 hasta i=3) : Primera clase
    if (i < 4) {
      seat.style.background = '#880ddb';
    } else {
      seat.style.background = '#ffe500';
    }
    containerSeats.appendChild(seat);
  }
};

var reserve = function() {
  var button = document.getElementById('button');
  button.addEventListener('click', chooseZone);
}

var chooseZone = function() {
  var choice = parseInt(prompt('¿En qué zona prefieres reservar? \n 1.-Primera Clase \n 2.- Clase Económica \n \n Por favor ingresa el número de tu preferencia'));

  if (choice == 1) {
    checkFirstClassZone();
  } else if (choice == 2) {
    checkEconomicZone();
  } else {
    alert('Por favor ingresa un número válido');
  }
}

var checkFirstClassZone = function() {
  var zone = 'Primera Clase';
  //recorre del elemento 0 al 3 y verifica cuales están disponibles:
  for (var index = 0; index < 4; index++) {
    if (airlineSeats[index] == false) {
      airlineSeats[index] = true;
      // al reservar un asiento no necesitamos seguir recorriendo nuestro arreglo
      //rompemos el ciclo for con break
      reserveSeat(index);
      paintTicket(index, zone);
      busySeats++;
      break;
    } else if (index == 3 && airlineSeats[index] == true) {
      reasignEconomicZone(zone);
    }
  }
};

var checkEconomicZone = function() {
  var zone = 'Clase Económica';
  //recorre del elemento 4 al 9 y verifica cuales están disponibles:
  for (var index = 4; index < 10; index++) {
    if (airlineSeats[index] == false) {
      airlineSeats[index] = true;
      // al reservar un asiento no necesitamos seguir recorriendo nuestro arreglo
      //rompemos el ciclo for con break
      reserveSeat(index);
      paintTicket(index, zone);
      busySeats++;
      break;
    } else if (index == 9 && airlineSeats[index] == true) {
      reasignFirstClass(zone);
    }
  }
};

var reserveSeat = function(indexToPaint) {
  var seat = document.getElementsByClassName('seats');
  seat[indexToPaint].textContent = 'Ocupado';
};

var reasignEconomicZone = function(zone) {
  if (busySeats == 10) {
    noSeats();
    nextFlight();
  } else {
    var reasign = confirm(
      'Ya no quedan asientos disponibles en ' + zone + '  :( \n ¿Desea reservar en zona económica? '
    );

    if (reasign == true) {
      checkEconomicZone();
    } else {
      nextFlight();
    }
  }
};

var reasignFirstClass = function(zone) {
  if (busySeats == 10) {
    noSeats();
    nextFlight();
  } else {
    var reasign = confirm(
      'Ya no quedan asientos disponibles en ' + zone + '  :( \n ¿Desea reservar en primera clase? '
    );

    if (reasign == true) {
      checkFirstClassZone();
    } else {
      nextFlight();
    }
  }
};

var paintTicket = function(index, zone) {
  var containerTickets = document.getElementById('tickets');
  var ticket = document.createElement('div');
  ticket.className = 'ticket-reserved'
  var title = document.createElement('p');
  var reservedSeating = document.createElement('p');
  var zoneClass = document.createElement('p');
  title.textContent = 'PASE DE ABORDAR';
  reservedSeating.textContent = 'Nro de asiento ' + (index + 1);
  zoneClass.textContent = zone;
  ticket.appendChild(title);
  ticket.appendChild(reservedSeating);
  ticket.appendChild(zoneClass);
  containerTickets.appendChild(ticket);
};

var nextFlight = function() {
  alert('¡Nuestro próximo vuelo sale en 3 horas!');
}

var noSeats = function() {
  alert('Lo sentimos :( \n ya no quedan asientos disponibles en este avion');
}




paintSeats(airlineSeats);
reserve();
