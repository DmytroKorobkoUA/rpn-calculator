import { Controller, Post, Body } from '@nestjs/common';
import { CalculatorService } from './calculator.service';

@Controller('calculator')
export class CalculatorController {
    constructor(private readonly calculatorService: CalculatorService) {}

    @Post()
    calculate(@Body('expression') expression: string) {
        return this.calculatorService.calculate(expression);
    }
}
