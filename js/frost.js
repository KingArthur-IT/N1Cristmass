let paths = document.getElementsByClassName('path');
let path;
for (let i = 0; i < paths.length; i++) {
  if ($(paths[i]).css('display') != 'none') {
    path = paths[i];
    break;
  }
};

let len = path.getTotalLength(),
    pos = 85;

render();


function render(k=1) {
  if (path.getAttribute('d') == '') return;
  
  if (pos >= len) pos -= 1;
  let p1 = path.getPointAtLength(pos),
      p2 = path.getPointAtLength(pos + 1),
      a = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
  prizes__frost.getElementsByTagName('use')[0].setAttribute("transform", "translate("+(p1.x)+","+ (p1.y*k) +")rotate("+a+")");
}

setInterval(() => {
  for (let i = 0; i < paths.length; i++) {
    if ($(paths[i]).css('display') != 'none') {
      path = paths[i];
      break;
    }
  };
  len = path.getTotalLength()

  let blockScroll = $('.prizes').offset().top;
  let scrollTop = $(window).scrollTop();
  let scroll = scrollTop - blockScroll;
  let height = $('.prizes').height() - $(window).height()/2;
  let progress = scroll * 100 / height;
  if (progress < 0) progress = 0;
  if (progress > 100) progress = 100;
  
  pos = progress * len / 100;
  let minPos = prizes__frost.getBoundingClientRect().width / 2;
  if (pos < minPos) pos = minPos;

  let $background = $('.prizes__background').filter((i, item) => ($(item).css('display') != 'none'));
  
  let exW = ($(window).outerWidth() - $(svg).outerWidth()) / 2;

  let size = $background.data('size');
  if (exW == 0) {
    let sizeX = Number(size.split(' ')[0]);
    let sizeY = size.split(' ')[1];
    svg.setAttribute('viewBox', `0 0 ${sizeX + exW} ${sizeY}`);
  } else {
    svg.setAttribute('viewBox', '0 0 ' + size);
  }

  let svgW = $background.width();
  let svgH = $background.height();
  $('#svg').width(svgW + exW);
  $('#svg').height(svgH);

  let w = $background.width();
  let h = $background.height();
  let rel = h / w;

  $background.height('auto')
  let oldW = $background.width();
  let oldH = $background.height();
  let oldRel = oldH / oldW;

  $background.height(h);

  let k = rel / oldRel;
  
  $(svg).css('left', $background.offset().left + 'px');

  let dataX = Number($background.data('x'));
  let dataY = Number($background.data('y'));

  $(path).css('transform', `translate(0) scale(1, ${k})`);
  let dif = dataY - (path.getBoundingClientRect().y - svg.getBoundingClientRect().y);
  if (dif < 0)
    dif /= k;
  else 
    dif *= k;

  $(path).css('transform', `translate(${dataX}px, ${dif}px) scale(1, ${k})`);
  $(prizes__frost).css('transform', `translate(${dataX}px, ${dif}px)`);
  
  render(k);
}, 1000/60);