const WIDTH = 200;
const HEIGHT = 100;
const SIZE = 6;

class Life {
  constructor() {
    this.cells = [];
    for (let i = 0; i < HEIGHT; i++) {
      this.cells.push(new Array(WIDTH).fill(false));
    }

    this.gliderGun(0, 0);
    this.gliderGun(60, 0);

    this.cells[59][80] = true;
    this.cells[60][80] = true;
    this.cells[61][80] = true;
  }

  gliderGun(x, y) {
    this.cells[y + 5][x + 1] = true;
    this.cells[y + 5][x + 2] = true;
    this.cells[y + 6][x + 1] = true;
    this.cells[y + 6][x + 2] = true;

    this.cells[y + 3][x + 14] = true;
    this.cells[y + 3][x + 13] = true;
    this.cells[y + 4][x + 12] = true;
    this.cells[y + 5][x + 11] = true;
    this.cells[y + 6][x + 11] = true;
    this.cells[y + 7][x + 11] = true;
    this.cells[y + 8][x + 12] = true;
    this.cells[y + 9][x + 13] = true;
    this.cells[y + 9][x + 14] = true;

    this.cells[y + 6][x + 15] = true;
    this.cells[y + 5][x + 17] = true;
    this.cells[y + 6][x + 17] = true;
    this.cells[y + 7][x + 17] = true;
    this.cells[y + 6][x + 18] = true;
    this.cells[y + 4][x + 16] = true;
    this.cells[y + 8][x + 16] = true;

    this.cells[y + 5][x + 21] = true;
    this.cells[y + 5][x + 22] = true;
    this.cells[y + 4][x + 21] = true;
    this.cells[y + 4][x + 22] = true;
    this.cells[y + 3][x + 21] = true;
    this.cells[y + 3][x + 22] = true;
    this.cells[y + 2][x + 23] = true;
    this.cells[y + 2][x + 25] = true;
    this.cells[y + 1][x + 25] = true;
    this.cells[y + 6][x + 23] = true;
    this.cells[y + 6][x + 25] = true;
    this.cells[y + 7][x + 25] = true;

    this.cells[y + 3][x + 35] = true;
    this.cells[y + 3][x + 36] = true;
    this.cells[y + 4][x + 35] = true;
    this.cells[y + 4][x + 36] = true;
  }

  tick() {
    let newCells = [];
    for (let i = 0; i < HEIGHT; i++) {
      newCells.push(new Array(WIDTH).fill(false));
    }
    for (let i = 0; i < HEIGHT; i++) {
      for (let j = 0; j < WIDTH; j++) {
        newCells[i][j] = this.check(i, j);
      }
    }
    this.cells = newCells;
  }

  setCells(cells) {
    this.cells = cells;
  }

  check(i, j) {
    let neighbors = 0;
    neighbors += this.valueOf(i + 1, j - 1);
    neighbors += this.valueOf(i + 1, j);
    neighbors += this.valueOf(i + 1, j + 1);
    neighbors += this.valueOf(i, j - 1);
    neighbors += this.valueOf(i, j + 1);
    neighbors += this.valueOf(i - 1, j - 1);
    neighbors += this.valueOf(i - 1, j);
    neighbors += this.valueOf(i - 1, j + 1);

    if (this.cells[i][j]) {
      if (neighbors < 2 || neighbors > 3) {
        return false;
      } else {
        return true;
      }
    } else {
      if (neighbors === 3) {
        return true;
      } else {
        return false;
      }
    }
  }

  valueOf(i, j) {
    if (i < HEIGHT && i >= 0 && j < WIDTH && j >= 0) {
      return (this.cells[i][j]) ? 1 : 0;
    } else {
      return 0;
    }
  }

  draw(ctx) {
    for (let i = 0; i < HEIGHT; i++) {
      for (let j = 0; j < WIDTH; j++) {
        if (this.cells[i][j]) {
          ctx.fillRect(j * SIZE, i * SIZE, SIZE, SIZE);
        }
      }
    }
  }
}
