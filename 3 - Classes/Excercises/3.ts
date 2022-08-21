const getEx3 = () => {
  abstract class Logger {
    abstract log(message: string): void;

    printDate(date: Date): void {
      this.log(date.toString());
    }
  }

  class logWithDate extends Logger {
    log(message: string): void {
      console.log(message);
    }

    logWithDate(message: string): void {
      this.printDate(new Date());
      this.log(message);
    }
  }

  const logger = new logWithDate();
  logger.logWithDate('Сообщение');
}

getEx3();