export default class TransactionsCsvParser {
    constructor() {
    }

    parseFile(String path) {
        csv.parse(data, (err, data) => {
            csv.transform(data, (data) => {
                return data.map((value) => value.toUpperCase());
            }, (err, data) => {
                process.stdout.write(data);
                csv.stringify(data, (err, data) => {
                    process.stdout.write(data);
                });
            });
        });
    }

    parseTransaction() {
    }
}