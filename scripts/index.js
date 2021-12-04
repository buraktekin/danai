let filter_value = 1;

function fireworks() {
  var duration = 15 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}

function schoolPride() {
  var end = Date.now() + (15 * 1000);
  var colors = ['#bb0000', '#ffbe00', '#ae81ff', '#00ff44'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

function handleTickInit(tick) {
  // get timer offset (if not found, set to today)
  var offset = new Date(localStorage.getItem('countdown-offset') || new Date());
  // store the offset (not really necessary but saves some if statements)
  localStorage.setItem('countdown-offset', offset);
  // time in hours the timer will run down
  var timeDuration = Tick.helper.duration(24, 'hours');
  // add 24 hours to get final deadline
  var t = new Date();
  var deadline = new Date(t.setSeconds(t.getSeconds() + 5));
  // create counter
  var counter = Tick.count.down(deadline, { format: ['h', 'm', 's'] });

  // update tick with the counter value
  counter.onupdate = function (value) {
    tick.value = value;
  };

  counter.onended = function () {
    // redirect, uncomment the next line
    // window.location = 'my-location.html'

    // hide counter, uncomment the next line
    var countdown = tick.root.style;
    tick.root.style.display = 'none';

    document.getElementById("start").style.opacity = 1;

    let timer = setInterval(() => {
      filter_value = filter_value / 1.2;
      if (filter_value < 0.001) {
        filter_value == 0;
        clearInterval(timer);
      }
      document.querySelector(".container").style.filter = `grayscale(${filter_value})`;
    }, 100);

    document.getAnimations().forEach((animation) => {
      animation.play();
    });

    fireworks();
    schoolPride();
    // show message, uncomment the next line
    // document.querySelector('.tick-onended-message').style.display = '';
  };
}

window.onresize = function () {
  var mySVG = document.getElementById('sky_day');
  if (window.matchMedia("(min-width: 500px)").matches) {
    mySVG.setAttribute("viewBox", "0 0 1300 600");
  } else {
    // mySVG.setAttribute("viewBox", "0 0 850 800");
  }
}

window.onload = function () {
  setTimeout(() => {
    document.getAnimations().forEach((animation) => {
      animation.pause();
    })
  }, 100);
}