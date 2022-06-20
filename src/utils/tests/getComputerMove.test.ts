import {getComputerMove} from '../getComputerMove';
import {isValidMove} from '../rockPaperScissorsCheck';

describe('getComputerMove', () => {
  it('should return either "R", "P" or "S"', () => {
    const move = getComputerMove();
    const actualResult = move && isValidMove(move);
    expect(actualResult).toBe(true);
  });

  it('should return either "R", "P" or "S" 20 times', () => {
    for (let i = 0; i <= 20; i++) {
      const move = getComputerMove();
      const actualResult = move && isValidMove(move);
      expect(actualResult).toBe(true);
    }
  });

  it('should return either "R", "P" or "S" 50 times', () => {
    for (let i = 0; i <= 50; i++) {
      const move = getComputerMove();
      const actualResult = move && isValidMove(move);
      expect(actualResult).toBe(true);
    }
  });

  it('should return either "R", "P" or "S" 100 times', () => {
    for (let i = 0; i <= 100; i++) {
      const move = getComputerMove();
      const actualResult = move && isValidMove(move);
      expect(actualResult).toBe(true);
    }
  });
});
