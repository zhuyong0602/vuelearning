import { defineStore } from 'pinia'

export const useTicketStore = defineStore('ticket', {
  state: () => ({
    tickets: [
      {
        id: 1,
        from: '北京',
        to: '上海',
        date: '2023-09-20',
        time: '09:00',
        price: 553,
        available: 50
      },
      {
        id: 2,
        from: '北京',
        to: '上海',
        date: '2023-09-20',
        time: '13:00',
        price: 553,
        available: 30
      }
    ],
    orders: []
  }),
  
  actions: {
    searchTickets(from, to, date) {
      return this.tickets.filter(
        ticket => 
          ticket.from === from && 
          ticket.to === to && 
          ticket.date === date
      )
    },
    
    bookTicket(ticketId) {
      const ticket = this.tickets.find(t => t.id === ticketId)
      if (ticket && ticket.available > 0) {
        ticket.available--
        const order = {
          id: Date.now(),
          ticketId,
          status: 'booked',
          ...ticket
        }
        this.orders.push(order)
        return order
      }
      return null
    },
    
    refundTicket(orderId) {
      const orderIndex = this.orders.findIndex(o => o.id === orderId)
      if (orderIndex !== -1) {
        const order = this.orders[orderIndex]
        const ticket = this.tickets.find(t => t.id === order.ticketId)
        if (ticket) {
          ticket.available++
          this.orders[orderIndex].status = 'refunded'
          return true
        }
      }
      return false
    }
  }
})