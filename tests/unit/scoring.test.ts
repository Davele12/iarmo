import test from 'node:test';
import assert from 'node:assert/strict';
import { questions, scoreAssessment, validAnswers } from '../../src/features/assessment/scoring';

test('all maturity answers map to an honest orientation without invented metrics', () => {
  assert.equal(questions.length, 8);
  assert.equal(scoreAssessment(Array(8).fill(0)).level, 'ordenar');
  assert.equal(scoreAssessment(Array(8).fill(1)).level, 'conectar');
  const result = scoreAssessment(Array(8).fill(2));
  assert.equal(result.level, 'evolucionar');
  assert.deepEqual(result.opportunities, []);
  assert.equal(result.score, 0);
});
test('score thresholds and ranking select the actual problem area', () => {
  assert.equal(scoreAssessment([0, 0, 0, 0, 0, 1, 2, 2]).score, 11);
  assert.equal(scoreAssessment([0, 0, 0, 0, 0, 2, 2, 2]).level, 'conectar');
  assert.equal(scoreAssessment([0, 0, 1, 2, 2, 2, 2, 2]).level, 'conectar');
  assert.equal(scoreAssessment([0, 0, 2, 2, 2, 2, 2, 2]).level, 'evolucionar');
  assert.equal(scoreAssessment([2, 2, 2, 2, 2, 2, 0, 2]).area, 'ia');
});
test('reject incomplete, out of range and non-numeric answers', () => {
  for (const input of [null, {}, [], Array(8).fill('1'), Array(8).fill(3), Array(8).fill(-1), Array(8).fill(1.2)]) assert.equal(validAnswers(input), false);
  assert.throws(() => scoreAssessment([0]));
});
