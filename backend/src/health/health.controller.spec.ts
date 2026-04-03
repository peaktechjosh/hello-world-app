import { describe, it } from 'node:test';
import * as assert from 'node:assert/strict';
import { Test } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('returns ok status with ISO timestamp', async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    const controller = moduleRef.get(HealthController);
    const response = controller.getHealth();

    assert.equal(response.status, 'ok');
    assert.ok(Number.isFinite(Date.parse(response.timestamp)));
  });
});
