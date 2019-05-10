import React from 'react';
import logo from './logo.svg';
import './App.css';

function rectsToLines(rects) {
  let temp = [];
  console.log('[...rects]', [...rects]);
  [...rects].map((e) => {
    let ex = temp.findIndex((i) => {
      if(i.top === e.top)
        return true;
      return false;
    });
    if(ex === -1)
      temp.push(e);
  });
  return temp;
}
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.contentRef = React.createRef();
    this.moreRef = React.createRef();

    this.more = this.more.bind(this);
  }
  more(e) {
    this.contentRef.current.style.height = 'auto';
  }
  trancute() {

  }
  componentDidMount() {
    //console.log(this.contentRef);
    let container = this.contentRef.current;
    let contains = container.contains(container.querySelector('.media'))
    //console.log(container.children)
    const maxLine = 10;
    let conteinerHeight = container.clientHeight;
    let containerRect = container.getBoundingClientRect();
    let lineCount = 0;
    let cutHeight = 0;
    let prevLineCount = 0;
    for(let i = 0; i < container.children.length; i++) {
      let e = container.children[i];
      let eRects = [];
      let eLineCount = eRects.length;
      if(!e.classList.contains('media')) {
        let temp = e.innerHTML;
        e.innerHTML = "<span>" + temp + "</span>";
        eRects = rectsToLines(e.children[0].getClientRects());
        eLineCount = eRects.length;
        e.innerHTML = temp;
      }
      console.log('rects',eRects)
      
      let boundRect = e.getBoundingClientRect();
      let elementHeight = e.clientHeight;
      let marginTop = parseFloat(window.getComputedStyle(e).getPropertyValue('margin-top'));
      let marginBottom = parseFloat(window.getComputedStyle(e).getPropertyValue('margin-bottom'));
      let marginY = marginTop + marginBottom;
      
      
      lineCount += eLineCount;//elementHeight / lineHeight;
      console.log('lc', lineCount)
      if(e.classList.contains('media') && prevLineCount < maxLine) {
        cutHeight += elementHeight + marginY;
        lineCount = prevLineCount;
        continue;
      }
      else if(lineCount <= maxLine) {
        console.log('hieght',eRects[eLineCount-1].bottom - eRects[0].top)
        cutHeight += elementHeight + marginY;//(eRects[eLineCount-1].bottom - eRects[0].top) + marginY;
        prevLineCount = lineCount;
      }
      else {
        console.log('hieght', eRects[maxLine-prevLineCount].top - eRects[0].top)
        console.log('boundRect', boundRect)
        console.log('containerRect', containerRect);
        console.log('line 0 top + margin:', eRects[0].top + marginTop)
        console.log('line offset:', (eRects[0].top + marginTop) - boundRect.top)
        let lineOffset = (eRects[0].top/* + marginTop*/) - boundRect.top;
        cutHeight += (eRects[maxLine-prevLineCount].top - eRects[0].top)/* + marginTop*/ + lineOffset;
        prevLineCount = lineCount;
        break;
      }
    }
    console.log('--------------------------------------');
    if(lineCount > maxLine) {
      container.style.height = cutHeight + 'px';
    }
  }
  render() {
    return (<React.Fragment><div className="trunc-container" ref={this.contentRef}>
    
      {this.props.children}
      
    </div><div className="more" onClick={this.more} ref={this.moreRef}>more</div></React.Fragment>);
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);

    
  }

  componentDidMount() {

  }
  
  render() {
  return (
    <div className="App">

    <div className="content">
    <Content> 
      <p>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты)</p>
      <div className="media"></div>
    </Content>
    </div>
    <div className="content">
    <Content> 
      <p><span style={{'fontSize':'8px'}}>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться.</span> Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты)</p>
      <div className="media"></div>
    </Content>
    </div>
    <div className="content">
    <Content>
      <p>Давно выяснено, <span style={{'fontSize':'28px'}}>что при оценке дизайна и композиции читаемый </span>текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, </p>
      <div className="media"></div>
      <p>а также <span style={{'fontSize':'28px'}}>реальное</span> распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты)</p>
    </Content>
    </div>
    <div className="content">
    <Content>
      <p>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, </p>
      <div className="media"></div>
      <p>а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты)</p>
    </Content>
    </div>
    <div className="content">
    <Content>
      <p>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, </p>
      <div className="media"></div>
    </Content>
    </div>
    <div className="content">
    <Content>
      <div className="media"></div>
      <p>а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты)</p>
    </Content>
    </div>
    <div className="content">
    <Content>
      <p>что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты)</p>
    </Content>
    </div>
    <div className="content">
    <Content>
    <div className="media"></div>
      <p>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты)</p>
      
    </Content>
    </div>
    <div className="content">
    <Content>
    <div className="media"></div>
      <p>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты)</p>
      <div className="media"></div>
    </Content>
    </div>
    <div className="content">
    <Content> 
      <p>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты)</p>
      <p>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты)</p>
      <p>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты)</p>
      <p>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты)</p>      
    </Content>
    </div>
    <div className="content">
    <Content> 
      <p> читаемый вно Д <span style={{'fontSize':'28px'}}>Двыяснено, что при оценке дизайна и композиции читаемый текст</span> мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты)</p>
    </Content>
    </div>
    <div className="content">
    <Content> 
      <p><span style={{'fontSize':'28px'}}>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты)</span></p>
    </Content>
    </div>
    </div>
  );
  }
}

export default App;
