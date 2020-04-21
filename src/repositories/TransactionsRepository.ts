import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;
    this.transactions.forEach(transaction => {
      switch (transaction.type) {
        case 'income':
          income += transaction.value;
          break;
        case 'outcome':
          outcome += transaction.value;
          break;
        default:
          throw new Error(`Invalid type (${transaction.type}) of transaction.`);
      }
    });
    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create(model: Transaction): Transaction {
    this.transactions.push(model);
    return model;
  }
}

export default TransactionsRepository;
