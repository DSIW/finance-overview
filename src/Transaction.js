export default class Transaction {
  constructor(props) {
    this.payee = props.payee_payer || props['Payee/Payer'];
    this.category = props.category || props['Category'] || 'Cat';
    this.subcategory = props.subcategory || props['Subcategory'] || 'Sub';
    this.note = props.note || props['Notes'];
    this.date = new Date(props.date || props['Date']);
    this.income = this._parseAmount(props.income || props['Income']);
    this.expense = this._parseAmount(props.expense || props['Expense']);
    this.value = this.income - this.expense;
  }

  search(keyword, attr) {
    const lowerKeyword = keyword.toLowerCase();

    let found = false;

    const contains = (a, b) => String(a).toLowerCase().indexOf(b) !== -1;
    
    if (attr) {
      if (attr === 'subcategory') {
        const [cat, subcat] = lowerKeyword.split(':');
        const foundCat = contains(this.category, cat);
        const foundSubcat = contains(this.subcategory, subcat);
        found = foundCat && foundSubcat;
      } else {
        const value = this[attr];
        found = contains(value, lowerKeyword);
      }
    } else {
      Object.entries(this).forEach(([key, value]) => {
        if (contains(value, lowerKeyword)) {
          found = true;
        }
      });
    }


    return found;
  }

  _parseAmount(amount) {
    if (typeof amount === 'string') {
      const parsed = parseFloat(amount.replace('.', '').replace(',', '.'));
      return parsed;
    } else if (typeof amount === 'number') {
      return amount;
    } else {
      return 0;
    }
  }
}
