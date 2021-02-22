let ctx = display.getContext('2d');

display.width = 800;
display.height = 400;

const randomInt = maxNum => {
  return Math.floor(Math.random() * maxNum);
}

const moveOne = (toChange, axis, increment) => {
  switch (axis) {
    case 'x':
      // if (toChange > display.width - 5 || toChange < 5) return toChange
      if (toChange > display.width - 5 && increment) {
        return toChange
      } else if (toChange < 5 && !increment) {
        return toChange
      }
      break;
    default:    
      if (toChange > display.height - 5 && increment) {
        return toChange
      } else if (toChange < 5 && !increment) {
        return toChange
      }
      break;
  }
  let mutator = increment ? 1 : -1;
  return toChange + mutator;
}

class Person {
  x = randomInt(display.width);
  y = randomInt(display.height);
  moveRight = Math.random() > .5 ? true : false;
  moveDown = Math.random() > .5 ? true : false;
  radius = 5;
  buddha = false;
  color = '#404244d6';
  move = function() {
    // Possibly change direction
    this.moveRight = Math.random() > .9 ? !this.moveRight : this.moveRight;
    this.moveDown = Math.random() > .9 ? !this.moveDown : this.moveDown;
    this.x = moveOne(this.x, 'x', this.moveRight);
    this.y = moveOne(this.y, 'y', this.moveDown);
  };
  render = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  };
  checkCollision = function(x, y) {
    let a = this.x - x;
    let b = this.y - y;
    let c = Math.sqrt((a*a)+(b*b));

    return c < this.radius * 2
  }
}

let population = 500;

let people = [];

for (let i = 0; i < population; i++) {
  people.push(new Person());
}

people[0].buddha = true;
people[0].color = 'hotpink';

let movement = setInterval(() => {
  ctx.clearRect(0, 0, display.width, display.height);
  people.forEach((person, i) => {
    person.move();
    person.render();
    for (let j = i+1; j < people.length; j++) {
      let other = people[j];
      let collision = person.checkCollision(other.x, other.y);
      if (collision && (person.buddha || other.buddha)) {
        person.color = other.color = 'hotpink';
        person.buddha = other.buddha = true;
      }
    }
  });
}, 50)

stopBtn.addEventListener('click', () => clearInterval(movement));