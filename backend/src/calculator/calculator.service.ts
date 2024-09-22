import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
    calculate(expression: string): number {
        return this.evaluateExpression(expression);
    }

    private evaluateExpression(expr: string): number {
        const precedence: Record<string, number> = { '+': 1, '-': 1, '*': 2, '/': 2 };
        const output: number[] = [];
        const operators: string[] = [];
        const tokens = this.tokenize(expr);

        tokens.forEach((token) => {
            if (!isNaN(Number(token))) {
                output.push(Number(token));
            } else if (token === '(') {
                operators.push(token);
            } else if (token === ')') {
                while (operators.length && operators[operators.length - 1] !== '(') {
                    this.applyOperator(output, operators.pop()!);
                }
                operators.pop();
            } else {
                while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                    this.applyOperator(output, operators.pop()!);
                }
                operators.push(token);
            }
        });

        while (operators.length) {
            this.applyOperator(output, operators.pop()!);
        }

        return output[0];
    }

    private tokenize(expr: string): string[] {
        const regex = /\d+|[+\-*/()]/g;
        return expr.match(regex) || [];
    }

    private applyOperator(output: number[], operator: string) {
        const b = output.pop();
        const a = output.pop();
        switch (operator) {
            case '+':
                output.push(a + b);
                break;
            case '-':
                output.push(a - b);
                break;
            case '*':
                output.push(a * b);
                break;
            case '/':
                output.push(a / b);
                break;
            default:
                throw new Error('Invalid operator');
        }
    }
}
