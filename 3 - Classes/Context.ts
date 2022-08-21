const getContext = () => {
  class Payment {
    private date: Date = new Date();

    // через this в параметрах указываем контекст, который должен быть при вызове
    getDate(this: Payment, type: 'date' | 'string'): Date | string {
      return type === 'date' ? this.date : this.date.toString();
    }

    // стр. функция всегда будет привязана к контексту Payment
    // но она не будет работать при вызове из дочерних классов (super.getDateArrow())
    getDateArrow = () => {
      return this.date;
    }
  }

  const payment = new Payment();

  const user = {
    id: 1,
    // bind() - чтобы передать контекст Payment
    paymentDate: payment.getDate.bind(payment),
    paymentDateArrow: payment.getDateArrow, 
  }

  console.log(payment.getDate('date'));
  console.log(user.paymentDate('string'));
  console.log(user.paymentDateArrow());
}

getContext();