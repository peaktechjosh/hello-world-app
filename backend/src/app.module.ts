import { Global, Module } from '@nestjs/common';
import { PrismaService } from './config/prisma.service';
import { GreetingModule } from './greeting/greeting.module';
import { HealthModule } from './health/health.module';

@Global()
@Module({
  imports: [HealthModule, GreetingModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
