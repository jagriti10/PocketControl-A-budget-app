//module for calculating budget and adding new item to data structure


var budgetController = (function(){

 //some code


})();
//module for adding ,i/p and updating through UI
var uiController =(function(){

    var DOMstring ={
        inputType:'.add_type',
        inputDescptn:'add_description',
        inputValue:'add_value',
        inputBtn:'add_btn'
    }

    return {
        getInput: function(){
            return {
               type :document.querySelector(DOMstring.inputType).value,
               value :document.querySelector(DOM.inputValue).value,
               description :document.querySelector(DOM.inputDescptn).value
                    };
        }

    };


})();

//module to connect budgetController and uiController modules
//global app controller
var controller = (function(bgtctrl ,uictrl){
    
    var setEventListeners= function(){

    var DOM = uictrl.getDOMstring;
    document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);
    
    document.addEventListener('keypress',function(event){
    if(event.keyCode===13 || event.which===13){
          ctrlAddItem();
        }
    });
};
    var ctrlAddItem = function(){
      
        var input =uictrl.getInput();
        console.log(input);

    }

    return{
        init:function(){
            setEventListeners(); 
        }
    }
})(budgetController,uiController);
controller.init();