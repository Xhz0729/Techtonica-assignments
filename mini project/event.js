// create an event class
class Event {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.availableTickets = [];
    }

    // add addAvailableTickets function
    addAvailableTickets(ticketType, price) {
        const ticket = new Ticket(ticketType, price);
        this.availableTickets.push(ticket);
    }

    // add allTickets function to return a string dispaly all tickets and prices
    allTickets() {
        return 'All tickets: ' + this.availableTickets.map((ticket, index) => {
            return `${index + 1}. ${ticket.ticketType} ($${ticket.price})`;
        }).join(' ');
    }
    
    // searchTickets
    searchTickets(min, max) {
        let eligibleTicket = [];
        this.availableTickets.forEach((ticket) => {
            if (ticket.price >= min && ticket.price <= max) {
                eligibleTicket.push(ticket);
            } 
        });
        if (eligibleTicket.length === 0) {
            return 'No tickets available.';
        }
        else {
            return "Eligible tickets: " + eligibleTicket.map((ticket, index) => {
            return `${index + 1}. ${ticket.ticketType} ($${ticket.price})`;
            }).join(' ');
        }
    }
}

// create a TicketType class
class Ticket {
    constructor(ticketType, price) {
        this.ticketType = ticketType;
        this.price = price;
    }
}

// create an event object
const eventObj1 = new Event(
    'The Worthy Co. – Candle Making',
    'Join TXWSW Fort Worth at the Worthy Co. Candle Studio for a candle making class!'
  );

// create few more objects with different values.
const eventObj2 = new Event(
    'TXWSW Dallas Coffee and Connections',
    'Join the women of TXWSW for an opportunity to network over coffee and breakfast at the Henry. '
  );

const eventObj3 = new Event(
    'Lunch N’ Learn Career Day',
    'Join TXWSW Dallas for a Lunch and Learn Career Day at Irma Rangel Young Women’s Leadership School.'
  );

// create an empty Event array.
const eventArray = new Array();

// pushing multiple objects to an array at once
eventArray.push(eventObj1, eventObj2, eventObj3);

// check whether the obj being pushed in
console.log(eventArray);

// adding li element by using eventArray value
document.addEventListener('DOMContentLoaded', () => {
    let liEles = '';
    eventArray.forEach((obj) => {
        liEles += `<li>${obj.name} - ${obj.description}</li> `

    });
    let ulEle = document.querySelector('#event');
    ulEle.innerHTML = liEles;
})

// add different type of tickets to every single one
// add tickets to eventObj1
eventObj1.addAvailableTickets('General admission', 15);
eventObj1.addAvailableTickets('Reserved seating', 55);

// add tickets to eventObj2
eventObj2.addAvailableTickets(' Early bird discount', 15);
eventObj2.addAvailableTickets('General admission', 20);
eventObj2.addAvailableTickets('Reserved seating', 60);

// add tickets to eventObj3
eventObj3.addAvailableTickets('General admission', 25);
eventObj3.addAvailableTickets('VIP', 60);

// display three event objects info
eventArray.forEach(event => {
    console.log(`${event.name} - ${event.description} - ${event.allTickets()}`);
});

// display the matched tickets, price between 10 to 20 instead of all tickets
eventArray.forEach(event => {
    console.log(`${event.name} - ${event.description} - ${event.searchTickets(10, 20)}`);
})

// display the matched tickets, price between 25 to 60 instead of all tickets
eventArray.forEach(event => {
    console.log(`${event.name} - ${event.description} - ${event.searchTickets(25, 60)}`);
})