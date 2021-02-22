// Setup
let buddha = new Image();
buddha.src = 'https://thebuddhapath.org/wp-content/uploads/2014/08/dzogchen_mandala_92-75x75.png';
let ctx = display.getContext('2d');

display.width = 4000;
display.height = 2000;

// Helper functions
const randomInt = maxNum => {
  return Math.floor(Math.random() * maxNum);
}

const moveOne = (toChange, axis, increment) => {
  switch (axis) {
    case 'x':
      // if (toChange > display.width - 5 || toChange < 5) return toChange
      if (toChange > display.width - 35 && increment) {
        return toChange
      } else if (toChange < 35 && !increment) {
        return toChange
      }
      break;
    default:    
      if (toChange > display.height - 35 && increment) {
        return toChange
      } else if (toChange < 35 && !increment) {
        return toChange
      }
      break;
  }
  let mutator = increment ? 3 : -3;
  return toChange + mutator;
}

// A dot!
class Person {
  x = randomInt(display.width);
  y = randomInt(display.height);
  moveRight = Math.random() > .5 ? true : false;
  moveDown = Math.random() > .5 ? true : false;
  radius = 37.5;
  buddha = false;
  move = function() {
    // Possibly change direction
    this.moveRight = Math.random() > .95 ? !this.moveRight : this.moveRight;
    this.moveDown = Math.random() > .95 ? !this.moveDown : this.moveDown;
    this.x = moveOne(this.x, 'x', this.moveRight);
    this.y = moveOne(this.y, 'y', this.moveDown);
  };
  render = function() {
    if (this.buddha) {
      ctx.fillStyle = '#021fff79';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 30, 0, 2 * Math.PI);
      ctx.fill();
      ctx.drawImage(buddha, this.x - this.radius, this.y - this.radius);
    } else {
      ctx.fillStyle = '#afafafde';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
    }

  };
  checkCollision = function(x, y) {
    let a = this.x - x;
    let b = this.y - y;
    let c = Math.sqrt((a*a)+(b*b));

    return c < this.radius * 2
  }
}

let population = 400;

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
}, 40)

stopBtn.addEventListener('click', () => clearInterval(movement));