import { Controller, Get, Param } from '@nestjs/common';
import { GreetingService } from './greeting.service';

@Controller('greeting')
export class GreetingController {
  constructor(private readonly greetingService: GreetingService) {}

  @Get()
  getGreeting(): { message: string; timestamp: string } {
    return this.greetingService.getGreeting();
  }

  @Get(':name')
  getGreetingByName(
    @Param('name') name: string,
  ): { message: string; timestamp: string } {
    return this.greetingService.getGreeting(name);
  }
}
