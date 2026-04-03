import { describe, it } from 'node:test';
import * as assert from 'node:assert/strict';
import { Test } from '@nestjs/testing';
import { GreetingController } from './greeting.controller';
import { GreetingService } from './greeting.service';

describe('GreetingController', () => {
  it('returns Hello World with ISO timestamp', async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GreetingController],
      providers: [GreetingService],
    }).compile();

    const controller = moduleRef.get(GreetingController);
    const response = controller.getGreeting();

    assert.equal(response.message, 'Hello World');
    assert.ok(Number.isFinite(Date.parse(response.timestamp)));
  });

  it('returns Hello Alice with ISO timestamp', async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GreetingController],
      providers: [GreetingService],
    }).compile();

    const controller = moduleRef.get(GreetingController);
    const response = controller.getGreetingByName('Alice');

    assert.equal(response.message, 'Hello Alice');
    assert.ok(Number.isFinite(Date.parse(response.timestamp)));
  });
});
