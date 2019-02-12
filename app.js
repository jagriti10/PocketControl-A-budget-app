//module for calculating budget and adding new item to data structure


var budgetController = (function(){

    var Expense = function(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
      };
      
      var Income = function(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;    
      };
      
      var data = {
        allItems: {
          expense: [],
          income: [],
        },
        totals: {
          expense: 0,
          income: 0
        }
      };
      
    return {
        addItem: function(type, desc, value) {
          var newItem, id;
          
          // Create new ID
          if (data.allItems.length > 0) {
            id = data.allItems[type][data.allItems[type].length - 1].id + 1;
          } else {
            id = 0;
          }
          
          console.log(id);
          // Create new item based on 'income' or 'expense'
          if (type === 'expense') {
            newItem = new Expense(id, desc, value);
            console.log(newItem);
          } else if (type === 'income') {
            newItem = new Income(id, desc, value);
          };
          
          // Push new item into data stucture
          console.log(data.allItems);
          data.allItems[type].push(newItem);
          return newItem;
        },
        testing: function() {
          console.log(data); 
        },
      }; 
})();
//module for adding ,i/p and updating through UI
var UIController = (function() {
    var DOMStrings = {
      inputType: '.add__type',
      inputDesc: '.add__description',
      inputValue: '.add__value',
      inputButton: '.add__btn'
    };
    
    return {
      getInput: function() {
        return {
          type: document.querySelector(DOMStrings.inputType).value,
          description: document.querySelector(DOMStrings.inputDesc).value,
          value: document.querySelector(DOMStrings.inputValue).value,
        };
      },
      getDomStrings: function() {
        return DOMStrings;
      }
    };
  })();

//module to connect budgetController and uiController modules
//global app controller
var controller = (function(budgetCtrlr, UICtrlr) {
    var setupEventListeners = function() {
      var dom = UIController.getDomStrings();
      
      document.querySelector(dom.inputButton).addEventListener('click', ctrlrAddItem);
      document.addEventListener('keypress', function(event){
        if (event.keyCode === 13 || event.which === 13) {
          ctrlrAddItem();
        }
      });
    };
var ctrlrAddItem = function () {
    var input, newItem;
    
    // 1. Get fields' input data
    input = UICtrlr.getInput();
    
    // 2. Add the item to the budget controller
    newItem = budgetCtrlr.addItem(input.type, input.description, input.value);

    // 3. Add the item to the item UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI    
    console.log(input);
  };
  
  return {
    init: function(){
      console.log('This application has started!');
      setupEventListeners();
    },
  }
})(budgetController, UIController);
controller.init();
