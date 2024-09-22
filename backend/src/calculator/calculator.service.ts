import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
    calculate(expression: string): number {
        const stack: number[] = [];
        const tokens = expression.split(' ');

        tokens.forEach((token) => {
            if (!isNaN(Number(token))) {
                stack.push(Number(token));
            } else {
                const b = stack.pop();
                const a = stack.pop();
                switch (token) {
                    case '+':
                        stack.push(a + b);
                        break;
                    case '-':
                        stack.push(a - b);
                        break;
                    case '*':
                        stack.push(a * b);
                        break;
                    case '/':
                        stack.push(a / b);
                        break;
                    default:
                        throw new Error('Invalid operator');
                }
            }
        });

        return stack[0];
    }
}
