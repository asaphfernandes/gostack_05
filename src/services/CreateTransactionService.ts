import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction, { transactionType } from '../models/Transaction';

interface TransactionRequest {
  title: string;
  value: number;
  type: transactionType;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(request: TransactionRequest): Transaction {
    const model = new Transaction(request);

    if (model.type !== 'income' && model.type !== 'outcome') {
      throw new Error('Invalid type');
    }

    const balance = this.transactionsRepository.getBalance();
    if (model.type === 'outcome' && balance.total < model.value) {
      throw new Error("The transaction value was can't be inserted");
    }

    return this.transactionsRepository.create(model);
  }
}

export default CreateTransactionService;
