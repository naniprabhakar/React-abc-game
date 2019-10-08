import React, { Component } from 'react'
import alphabets from './alphabets.json';
import classnames from 'classnames';    


 class EasyABC extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              alphabets:alphabets,
              currentposition:0,
              currentTick:0,
              random:false,
              sound:true
         };
         this.next=this.next.bind(this);
         this.prev=this.prev.bind(this);
         this.playSound=this.playSound.bind(this);
         this.switchRandom=this.switchRandom.bind(this);
         this.switchSound=this.switchSound.bind(this);
         this.manualPlaySound=this.manualPlaySound.bind(this);
         
     }
     componentDidMount(){
         let letterSound=document.querySelector('audio[data-key="letter"]');

         if(this.state.currentposition===0){
         letterSound.currentTime=0;
        letterSound.play();
         }

     }
     componentDidUpdate(){
         this.playSound();
     }

     manualPlaySound(){
        let letterSound=document.querySelector('audio[data-key="letter"]');
         
        let wordSound=document.querySelector('audio[data-key="word"]');
        if(this.state.currentTick===0){
            letterSound.currentTime=0;
        
            letterSound.play();
        }
        else{
            wordSound.currentTime=0;
            wordSound.play();
        } 
     }
     playSound(){
        let letterSound=document.querySelector('audio[data-key="letter"]');
         
        let wordSound=document.querySelector('audio[data-key="word"]');

        if(this.state.sound){
            if(this.state.currentTick===0){
                letterSound.currentTime=0;
            
                letterSound.play();
            }else{
                wordSound.currentTime=0;
                wordSound.play();
            }
        }

       
     }
     randomNumber(max,min){
         return Math.floor(Math.random() * (max - min + 1))+min;
     }
   next (){
         console.log('next button clicked');
         if(this.state.random){
             if(this.state.currentTick<2){
                 this.setState({currentTick:this.state.currentTick+1});
             }else{
                this.setState({currentposition:this.randomNumber(0,25),currentTick:0})
             }
         }else{
            if(this.state.currentposition===this.state.alphabets.length-1){
                          if(this.state.currentTick<2){
                    this.setState({currentTick:this.state.currentTick+1});
                                }else{
                    this.setState({currentposition:0,currentTick:0});
                }
             }else{
             if(this.state.currentTick<2){
                 this.setState({currentTick:this.state.currentTick+1});
             }else{
                this.setState({currentposition:this.state.currentposition+1,currentTick:0});
             }
             }
         }
        
          //  this.playSound();
     }
     prev(){
         console.log('prev button clicked');
         if(this.state.currentposition>0){
            this.setState({currentposition:this.state.currentposition-1});

         }else{
             this.setState({currentposition:this.state.alphabets.length-1});
         }
       
     }
     switchRandom(){
         this.setState({random: !this.state.random});
     //    this.next();
     }

     switchSound(){
        this.setState({sound: !this.state.sound});
    //    this.next();
    }
      
    render() {
    
       let showImage =this.state.currentTick !== 0 ? true : false; 
       let showWord =this.state.currentTick === 2 ? true : false; 
       console.log(this.state.currentTick,showImage);

        return (
            <div className="game">
                <span className="random-label">Random letter :</span>
                <label className="switch">
                    <input type="checkbox" onClick={this.switchRandom} defaultValue="false" checked={this.state.random}>
                    </input>
                    <div  className="slider round"></div>
                </label>
                <span className="random-label"> Sound :</span>
                <label className="switch">
                    <input type="checkbox" onClick={this.switchSound} defaultValue="false" checked={this.state.sound}>
                    </input>
                    <div  className="slider round"></div>
                </label>
                <div className="option">
                    <div className="fields">
                        <div className="field-block">
                            {this.state.alphabets[this.state.currentposition].letter}
                        </div>
                        <audio src={this.state.alphabets[this.state.currentposition].letterSound} data-key="letter"/>
                    </div>
                 
                    <div className="button">
                        <a onClick={this.prev} href="#" className="button prev">Previous</a>
                        <a  onClick={this.manualPlaySound}href="#" className="button sound">play Sound again</a> 
                        <a onClick={this.next} href="#" className="button next">Next</a>
                    </div>
                    <div className="fields">
                        <div className="field-block">
                            <div className="left-field">
                            <div  className={classnames('placeholder-span',{hide:showImage})}>Click next to view image </div>
                            <img className={classnames('letter-image',{hide:!showImage})}
                            alt={this.state.alphabets[this.state.currentposition].words}
                            src={this.state.alphabets[this.state.currentposition].image}/>
                             <audio src={this.state.alphabets[this.state.currentposition].wordSound} data-key="word"/>
                            </div>
                            <div className="right-field"><div className={classnames('placeholder-span',{hide:showWord})}>Click next to view spelling </div>
                            <div className={classnames('word',{hide:!showWord})}>
                                {this.state.alphabets[this.state.currentposition].word.toUpperCase()}
                            </div>
                            
                            </div>
                         </div>
                    </div>  
                </div>
                </div>
        )
    }
}

export default EasyABC;