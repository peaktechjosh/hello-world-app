import { Injectable } from '@nestjs/common';

@Injectable()
export class GreetingService {
  getGreeting(name?: string): { message: string; timestamp: string } {
    const message = name ? `Hello ${name}` : 'Hello World';

    return {
      message,
      timestamp: new Date().toISOString(),
    };
  }
}
