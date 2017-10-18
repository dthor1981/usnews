'use strict';

require('main.scss');

const MainTemplate = require('./main.njk');
const nunjucks = require('nunjucks')

nunjucks.configure('', {
  autoescape: true,
  aync: true
});

const env = new nunjucks.Environment(new nunjucks.WebLoader('/'));

/*************************************/
// Page Component/Service - Holds Model and View
// Model and View are defined in every instantiation. 
/*************************************/
class Component {
    constructor(options){
        //if options is undefined return empty object as options
            if(!options){
                options = {};
        }
            //default options settings
      
      this.dataUrl = options.dataUrl?options.dataUrl:'data/data-1.json';
      this.renderUrl = options.renderUrl?options.renderUrl:'main.njk';
   
    } 

    getModelView(){
        var _renderUrl = this.renderUrl;
        const modelView = nunjucks.render(this.dataUrl, function(err, res) {
            var data = JSON.parse(res);
            //console.log(data.ranking);
            nunjucks.render(_renderUrl, function(err, res) {
                var model = data;
                //console.log(model.ranking);
                document.getElementById('content').innerHTML = MainTemplate.render({model});
            }); 
        });  
    }
  }
  /***********************************/
  //Main Page Component/Controller 
  /***********************************/
  class MainComponent extends Component {

        constructor (options) {
        super(options);
    }

        controller() {
        super.getModelView();
        var _this = this;
        console.log(this);
        var _dataUrl = this.dataUrl;
        var _renderUrl = this.renderUrl;
        var btnEl = document.getElementById('button');
            btnEl.addEventListener('click', function(e) {
                e.preventDefault();
                if(_this.dataUrl == 'data/data-1.json'){
                    _this.dataUrl ='data/data-2.json'
                    const newModelView = nunjucks.render(_this.dataUrl, function(err, res) {
                        var data = JSON.parse(res);
                        nunjucks.render(_renderUrl , function(err, res) {
                        var model = data;
                        document.getElementById('content').innerHTML = MainTemplate.render({model});
                        document.getElementsByClassName('badge')[0].setAttribute('src', '/img/liberal-arts-badge.svg');
                    }); 
                });  
                }else{
                    _this.dataUrl ='data/data-1.json'
                    const newModelView = nunjucks.render(_this.dataUrl, function(err, res) {
                        var data = JSON.parse(res);
                        nunjucks.render(_renderUrl , function(err, res) {
                            var model = data;
                            document.getElementById('content').innerHTML = MainTemplate.render({model});
                        }); 
                    }); 
                }
            })
        }

        updateModelView(updatedUrl) {
            const updateModelView = nunjucks.render(updatedUrl, function(err, res) {
                var data = JSON.parse(res);
                nunjucks.render(_renderUrl , function(err, res) {
                    var model = data;
                    document.getElementById('content').innerHTML = MainTemplate.render({model});
                }); 
            }); 
        }
    }
/***********************************/
  //Main Page Component/Controller 
/***********************************/
let mainComponent = new MainComponent({
    dataUrl: 'data/data-1.json',
    renderUrl: 'main.njk',
  });

  mainComponent.controller();
 

