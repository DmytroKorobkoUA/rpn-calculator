import { Controller, Get, Query } from '@nestjs/common';
import { CalculatorService } from './calculator.service';

@Controller('calculator')
export class CalculatorController {
    constructor(private readonly calculatorService: CalculatorService) {}

    @Get()
    calculate(@Query('expression') expression: string) {
        return this.calculatorService.calculate(expression);
    }
}
